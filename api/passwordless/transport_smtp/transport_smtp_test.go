package transportsmtp

import (
	"context"
	"net/smtp"
	"os"
	"testing"

	"github.com/joho/godotenv"
	"github.com/nextri/product-road/passwordless"

	smtpmock "github.com/mocktools/go-smtp-mock"
)

func init() {
	if err := godotenv.Load("../../.env"); err != nil {
		panic("No .env file found")
	}
}

var mockServer *smtpmock.Server
var config SMTPConfig

func TestMain(m *testing.M) {
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

	code := m.Run()

	if err := mockServer.Stop(); err != nil {
    panic("Failed to stop mock SMTP server: " + err.Error())
  }

	os.Exit(code)
}

func TestSMTPTransport_SendToken_MagicLink_NewUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "qyGdH7Ouuhq8ONOUX2OUKWGB-One_K2Lh0k5F4WhaU8"

	err := smtpTransport.SendToken(context.Background(), email, token, passwordless.TokenTypeString, true)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}

func TestSMTPTransport_SendToken_CodePIN_NewUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "123456"

	err := smtpTransport.SendToken(context.Background(), email, token, passwordless.TokenTypePin, true)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}

func TestSMTPTransport_SendToken_MagicLink_ExistingUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "qyGdH7Ouuhq8ONOUX2OUKWGB-One_K2Lh0k5F4WhaU8"

	err := smtpTransport.SendToken(context.Background(), email, token, passwordless.TokenTypeString, false)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}

func TestSMTPTransport_SendToken_CodePIN_ExistingUser(t *testing.T) {
	smtpTransport := NewSMTPTransport(config)

	email := "odjaidri@gmail.com"
	token := "123456"

	err := smtpTransport.SendToken(context.Background(), email, token, passwordless.TokenTypePin, true)
	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}
}
