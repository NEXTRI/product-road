package utils

import (
	"testing"
)

func TestValidateEmail_ValidEmail(t *testing.T) {
  email := "test@gmail.com"
  err := ValidateEmail(email)

  if err != nil {
    t.Errorf("Expected no error for valid email, got %v", err)
  }
}

func TestValidateEmail_InvalidEmail(t *testing.T) {
  email := "test"
  err := ValidateEmail(email)

  if err == nil {
    t.Error("Expected error for invalid email, got nil")
  } else if err.Error() != "invalid email format" {
    t.Errorf("Expected 'invalid email format' error, got %v", err.Error())
  }
}
