package passwordless

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"testing"
)

func TestLogTransport_SendToken_MagicLink_NewUser(t *testing.T) {
	logger := &BufferLogger{}

	logTransport := NewLogTransport(logger)

	email := "test@test.com"
	token := "qyGdH7Ouuhq8ONOUX2OUKWGB-One_K2Lh0k5F4WhaU8"

  testBaseURL := "http://localhost:8080"
  os.Setenv("APP_BASE_URL", testBaseURL)

	// Capture the standard output
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := logTransport.SendToken(context.Background(), email, token, TokenTypeString, true)

	// Restore the standard output
	w.Close()
	os.Stdout = old

	// Read the captured output
	var buf bytes.Buffer
	buf.ReadFrom(r)

	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}

	expectedLog := fmt.Sprintf("Magic link sent to %s (temporary user): %s/authenticate?token=%s&email=%s&userStatus=temporary\n", email, testBaseURL, token, email)

	if log := buf.String(); log != expectedLog {
		t.Errorf("Expected log: %s, got: %s", expectedLog, log)
	}

  os.Unsetenv("APP_BASE_URL")
}

func TestLogTransport_SendToken_CodePIN_NewUser(t *testing.T) {
	logger := &BufferLogger{}

	logTransport := NewLogTransport(logger)

	email := "test@test.com"
	pin := "123456"

	// Capture the standard output
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := logTransport.SendToken(context.Background(), email, pin, TokenTypePin, true)

	// Restore the standard output
	w.Close()
	os.Stdout = old

	// Read the captured output
	var buf bytes.Buffer
	buf.ReadFrom(r)

	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}

	expectedLog := fmt.Sprintf("PIN sent to %s (temporary user): %s\n", email, pin)

	if log := buf.String(); log != expectedLog {
		t.Errorf("Expected log: %s, got: %s", expectedLog, log)
	}
}

func TestLogTransport_SendToken_MagicLink_ExistingUser(t *testing.T) {
	logger := &BufferLogger{}

	logTransport := NewLogTransport(logger)

	email := "test@test.com"
	token := "qyGdH7Ouuhq8ONOUX2OUKWGB-One_K2Lh0k5F4WhaU8"

  testBaseURL := "http://localhost:8080"
  os.Setenv("APP_BASE_URL", testBaseURL)

	// Capture the standard output
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := logTransport.SendToken(context.Background(), email, token, TokenTypeString, false)

	// Restore the standard output
	w.Close()
	os.Stdout = old

	// Read the captured output
	var buf bytes.Buffer
	buf.ReadFrom(r)

	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}

	expectedLog := fmt.Sprintf("Magic link sent to %s (existing user): %s/authenticate?token=%s&email=%s&userStatus=existing\n", email, testBaseURL, token, email)

	if log := buf.String(); log != expectedLog {
		t.Errorf("Expected log: %s, got: %s", expectedLog, log)
	}

  os.Unsetenv("APP_BASE_URL")
}

func TestLogTransport_SendToken_CodePIN_ExistingUser(t *testing.T) {
	logger := &BufferLogger{}

	logTransport := NewLogTransport(logger)

	email := "test@test.com"
	pin := "123456"

	// Capture the standard output
	old := os.Stdout
	r, w, _ := os.Pipe()
	os.Stdout = w

	err := logTransport.SendToken(context.Background(), email, pin, TokenTypePin, false)

	// Restore the standard output
	w.Close()
	os.Stdout = old

	// Read the captured output
	var buf bytes.Buffer
	buf.ReadFrom(r)

	if err != nil {
		t.Errorf("SendToken failed: %v", err)
	}

	expectedLog := fmt.Sprintf("PIN sent to %s (existing user): %s\n", email, pin)

	if log := buf.String(); log != expectedLog {
		t.Errorf("Expected log: %s, got: %s", expectedLog, log)
	}
}
