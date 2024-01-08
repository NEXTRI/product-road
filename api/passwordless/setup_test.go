package passwordless

import (
	"context"
	"net/smtp"
	"os"
	"testing"

	"github.com/joho/godotenv"
	smtpmock "github.com/mocktools/go-smtp-mock"
	"github.com/redis/go-redis/v9"
)

func init() {
	// Load environment variables
	if err := godotenv.Load("../.env"); err != nil {
		panic("No .env file found")
	}
}

var mockServer *smtpmock.Server
var config SMTPConfig

var redisClient *redis.Client

func TestMain(m *testing.M) {
	// Setup Redis
	redisClient = redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		DB: 1,
	})

	// Setup SMTP Mock Server
	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")
	username := os.Getenv("SMTP_USERNAME")
	password := os.Getenv("SMTP_PASSWORD")
	from := os.Getenv("SMTP_FROM")
	auth := smtp.PlainAuth("", username, password, host)
	addr := host + ":" + port
	config = SMTPConfig{
		UseSSL: false,
		Addr:   addr,
		From:   from,
		Auth:   auth,
	}

	mockServer = smtpmock.New(smtpmock.ConfigurationAttr{LogToStdout: true})
	if err := mockServer.Start(); err != nil {
		panic("Failed to start mock SMTP server: " + err.Error())
	}

	// Run tests
	code := m.Run()

	// Teardown
	redisClient.FlushDB(context.Background())
	if err := mockServer.Stop(); err != nil {
    panic("Failed to stop mock SMTP server: " + err.Error())
  }

	os.Exit(code)
}
