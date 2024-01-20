package passwordless

import (
	"context"
	"errors"
	"time"
)

var (
	ErrTokenNotFound = errors.New("the token does not exist")
  ErrTokenNotExpired = errors.New("the token is expired")
	ErrTokenNotValid = errors.New("the token is not valid")
)

// TokenStore is a storage mechanism for tokens.
type TokenStore interface {
  // StoreUserToken stores a user token in the specified token store.
  // The isTemp parameter indicates whether the token is for a temporary user.
  StoreUserToken(ctx context.Context, email, token string, ttl time.Duration, isTemp bool) error

  // Exists checks if a token exists in the specified token store.
  Exists(ctx context.Context, token string) (bool, time.Time, error)

  // Verify checks if a token is valid.
  Verify(ctx context.Context, token string) (bool, error)

  // Delete removes a token from the specified token store.
  Delete(ctx context.Context, token string) error
}
