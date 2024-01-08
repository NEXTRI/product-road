package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/joho/godotenv"
	"github.com/nextri/product-road/authentication/handler"
	"github.com/nextri/product-road/authentication/repository/postgres"
	"github.com/nextri/product-road/authentication/service"
	"github.com/nextri/product-road/passwordless"
)

func main() {
  if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

  connectionString := os.Getenv("DATABASE_URL")

  tokenConfig := passwordless.TokenConfig{
    Type: passwordless.TokenTypeString,
    ExpiryTime: 5 * time.Minute,
    Length: 32,
  }
  
	pgRepo, err := postgres.NewPostgresRepository(connectionString)
  if err != nil {
		log.Fatal("Failed to initialize PostgreSQL repository:", err)
	}

  logger := &passwordless.BufferLogger{}

  userService := service.NewUserService(pgRepo)
  // emailService := service.NewEmailService(passwordless.NewMemoryStore(), passwordless.NewLogTransport(logger), passwordless.NewToken(tokenConfig), tokenConfig)
	emailService := service.NewEmailService(passwordless.NewMemoryStore(), passwordless.NewLogTransport(logger), passwordless.NewToken(tokenConfig), tokenConfig)
  jwtService := service.NewJWTService()

  handler.InitServices(userService, emailService, jwtService)

  http.HandleFunc("/api/v1/auth/login", handler.LoginHandler)
  http.HandleFunc("/api/v1/auth/verify", handler.MagicLinkVerificationHandler)

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
