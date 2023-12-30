package utils

import "errors"

var (
  ErrInvalidEmail = errors.New("invalid email format")
  ErrEmailExists = errors.New("email already exists")
)
