package main

import (
	"context"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"
	authModule "github.com/nextri/product-road/auth"
	"github.com/nextri/product-road/db/postgres"
	"github.com/nextri/product-road/passwordless"
	pmModule "github.com/nextri/product-road/project-management"
	"github.com/nextri/product-road/service"
	"github.com/redis/go-redis/v9"
)

func main() {
  if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

  tokenConfig := passwordless.TokenConfig{
    Type: passwordless.TokenTypeString,
    ExpiryTime: 5 * time.Minute,
    Length: 32,
  }

	err := postgres.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")
	username := os.Getenv("SMTP_USERNAME")
	password := os.Getenv("SMTP_PASSWORD")
	from := os.Getenv("SMTP_FROM")
	auth := smtp.PlainAuth("", username, password, host)
	addr := host + ":" + port
	config := passwordless.SMTPConfig{
		UseSSL: false,
		Addr:   addr,
		From:   from,
		Auth:   auth,
	}

	redisClient := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		DB: 1,
	})

  userService := service.NewUserService(postgres.NewUserRepository())
	emailTokenService := authModule.NewEmailTokenService(passwordless.NewRedisStore(redisClient), passwordless.NewSMTPTransport(config), passwordless.NewToken(tokenConfig), tokenConfig)
  tokenAuthService := authModule.NewTokenAuthService()

  authModule.InitServices(userService, emailTokenService, tokenAuthService)

  http.HandleFunc("/api/v1/auth/login", authModule.LoginHandler)
  http.HandleFunc("/api/v1/auth/verify", authModule.MagicLinkVerificationHandler)

	projectService := service.NewProjectService(postgres.NewProjectRepository())
	pmModule.InitServices(projectService)

	http.HandleFunc("/api/v1/projects/create", pmModule.CreateProjectHandler)

	http.HandleFunc("/api/v1/projects/", func(w http.ResponseWriter, r *http.Request) {
		switch r.Method {
			case http.MethodDelete:
				pmModule.DeleteProjectHandler(w, r)
			case http.MethodPut:
				pmModule.UpdateProjectHandler(w, r)
			default:
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

  // Health check endpoint
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

  srv := &http.Server{
		Addr: ":8080",
	}

  go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("server listen: %s\n", err)
		}
	}()

  stopChan := make(chan os.Signal, 1)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)

  <-stopChan
	log.Println("Shutting down server...")

  ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

  if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}

  log.Println("Server gracefully stopped")
}
