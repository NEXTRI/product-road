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
	fmModule "github.com/nextri/product-road/feedback-management"
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

	emailTokenService := authModule.NewEmailTokenService(passwordless.NewRedisStore(redisClient), passwordless.NewSMTPTransport(config), passwordless.NewToken(tokenConfig), tokenConfig)
  userService := service.NewUserService(postgres.NewUserRepository())
  tokenAuthService := authModule.NewTokenAuthService()
	projectService := service.NewProjectService(postgres.NewProjectRepository())
	feedbackService := service.NewFeedbackService(postgres.NewFeedbackRepository())

  authModule.InitServices(userService, emailTokenService, tokenAuthService)
	pmModule.InitServices(projectService)
	fmModule.InitServices(feedbackService)

	router := http.NewServeMux()

	// Health check endpoint
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("OK"))
	})

  router.HandleFunc("POST /auth/login", authModule.LoginHandler)
  router.HandleFunc("POST /auth/verify", authModule.MagicLinkVerificationHandler)

	router.HandleFunc("GET /projects", pmModule.GetAllProjectsHandler)
	router.HandleFunc("GET /projects/{id}", pmModule.GetProjectHandler)
	router.HandleFunc("POST /projects", pmModule.CreateProjectHandler)
	router.HandleFunc("PUT /projects/{id}", pmModule.UpdateProjectHandler)
	router.HandleFunc("DELETE /projects/{id}", pmModule.DeleteProjectHandler)

	router.HandleFunc("GET /feedbacks/{project_id}", fmModule.GetAllFeedbacksHandler)

	v1 := http.NewServeMux()
	v1.Handle("/api/v1/", http.StripPrefix("/api/v1/", router))

  srv := &http.Server{
		Addr: ":8080",
		Handler: router,
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
