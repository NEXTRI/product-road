package utils

import (
	"regexp"
)

// ValidateEmail checks if the email has a valid format.
func ValidateEmail(email string) error {
  pattern := regexp.MustCompile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  matches := pattern.MatchString(email)

  if !matches {
    return ErrInvalidEmail
  }
  return nil
}
