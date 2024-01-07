package transportsmtp

import (
	"context"
	"fmt"
	"net/smtp"
	"os"

	"github.com/nextri/product-road/passwordless"
)

// SMTPConfig holds the configuration for SMTPTransport.
type SMTPConfig struct {
	UseSSL   bool
	Addr     string
	From     string
	Auth     smtp.Auth
}

// SMTPTransport delivers a user token via e-mail.
type SMTPTransport struct {
	config SMTPConfig
}

// NewSMTPTransport returns a new transport capable of sending emails via SMTP.
func NewSMTPTransport(config SMTPConfig) *SMTPTransport {
	return &SMTPTransport{config}
}

// SendToken sends a token using the log transport.
func (s *SMTPTransport) SendToken(ctx context.Context, email, token string, tokenType passwordless.TokenType, isTemp bool) error {
	baseURL := os.Getenv("APP_BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8080"
	}

	subject, body := composeEmail(email, token, tokenType, isTemp, baseURL)
	to := []string{email}
	msg := []byte("To: " + email + "\r\n" +
		"Subject: " + subject + "\r\n" +
		"\r\n" +
		body + "\r\n")
	
	if s.config.UseSSL {
		return sendMailSSL(s.config.Addr, s.config.Auth, s.config.From, to, msg)
	} else {
		return smtp.SendMail(s.config.Addr, s.config.Auth, s.config.From, to, msg)
	}
}

func composeEmail(email, token string, tokenType passwordless.TokenType, isTemp bool, baseURL string) (subject, body string) {
	switch tokenType {
	case passwordless.TokenTypeString:
		var userStatus string
		if isTemp {
			userStatus = "temporary"
		} else {
			userStatus = "existing"
		}
		magicLink := fmt.Sprintf("%s/authenticate?token=%s&email=%s&userStatus=%s", baseURL, token, email, userStatus)
		subject = "Your Magic Link"
		body = fmt.Sprintf("Hello,\n\nPlease use the following link to login: %s", magicLink)
	case passwordless.TokenTypePin:
		subject = "Your PIN"
		body = fmt.Sprintf("Hello,\n\nYour PIN is: %s", token)
	}
	return
}

func sendMailSSL(addr string, auth smtp.Auth, from string, to []string, msg []byte) error {
	return nil
}
