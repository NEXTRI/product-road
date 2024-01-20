package passwordless

import (
	"context"
	"fmt"
	"os"
)

// Logger is a simple logger interface.
type Logger interface {
  Log(message string)
}

// BufferLogger is an implementation of the Logger interface.
type BufferLogger struct{}

// Log logs a message directly to the terminal.
func (l *BufferLogger) Log(message string) {
  fmt.Fprintln(os.Stdout, message)
}

// LogTransport is a token transport that logs the token.
type LogTransport struct {
  logger Logger
  baseURL string
}

// NewLogTransport creates a new LogTransport.
func NewLogTransport(logger Logger) *LogTransport {
  baseURL := os.Getenv("APP_BASE_URL")
  if baseURL == "" {
    baseURL = "http://localhost:8080"
  }
  return &LogTransport{logger, baseURL}
}

// SendToken sends a token using the log transport.
func (t *LogTransport) SendToken(ctx context.Context, email, token string, tokenType TokenType) error {
  var message string
  
  switch tokenType {
  case TokenTypeString:
    magicLink := fmt.Sprintf("%s/authenticate?token=%s", t.baseURL, token)
    message = fmt.Sprintf("Magic link sent to %s: %s", email, magicLink)
  case TokenTypePin:
    message = fmt.Sprintf("PIN sent to %s: %s", email, token)
  default:
    return fmt.Errorf("unknown token type: %s", tokenType)
  }

  t.logger.Log(message)
  return nil
}
