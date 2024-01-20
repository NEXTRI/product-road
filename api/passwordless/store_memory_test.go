package passwordless

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestMemoryStore_StoreUserToken_NewUser(t *testing.T) {
  memStore := NewMemoryStore()
  email := "newuser@test.com"
  token := "newUserToken123"
  ttl := 5 * time.Minute

  err := memStore.StoreUserToken(context.Background(), token, email, ttl, true)

  if err != nil {
    t.Fatalf("StoreUserToken failed for a new user: %v", err)
  }

  isValid, err := memStore.Verify(context.Background(), token)

  if err != nil {
    t.Fatalf("Verify failed for new user: %v", err)
  }

  if !isValid {
    t.Error("Expected token for new user to be valid, but it's not.")
  }

  storedToken, ok := memStore.tokens[token]

  if !ok {
    t.Fatal("Token was not stored correctly for new user")
  }

  if !storedToken.IsTemp {
    t.Error("Expected IsTemp to be true for new user, but it was false")
  }
}

func TestMemoryStore_StoreUserToken_ExistingUser(t *testing.T) {
  memStore := NewMemoryStore()
  email := "existinguser@test.com"
  token := "existingUserToken456"
  ttl := 5 * time.Minute

  err := memStore.StoreUserToken(context.Background(), token, email, ttl, false)

  if err != nil {
    t.Fatalf("StoreUserToken failed for an existing user: %v", err)
  }

  isValid, err := memStore.Verify(context.Background(), token)

  if err != nil {
    t.Fatalf("Verify failed for existing user: %v", err)
  }

  if !isValid {
    t.Error("Expected token for existing user to be valid, but it's not.")
  }

  storedToken, ok := memStore.tokens[token]

  if !ok {
    t.Fatal("Token was not stored correctly for existing user")
  }

  if storedToken.IsTemp {
    t.Error("Expected IsTemp to be false for existing user, but it was true")
  }
}

func TestMemoryStore_GetTokenData(t *testing.T) {
	memStore := NewMemoryStore()
	token := "testToken123"
	email := "test@example.com"
	ttl := 5 * time.Minute
	isTemp := true

	err := memStore.StoreUserToken(context.Background(), token, email, ttl, isTemp)
	assert.NoError(t, err, "storing token should not produce an error")

	retrievedToken, err := memStore.GetTokenData(context.Background(), token)
	assert.NoError(t, err, "retrieving existing token should not produce an error")
	assert.Equal(t, email, retrievedToken.Email, "retrieved token email should match stored email")
	assert.Equal(t, isTemp, retrievedToken.IsTemp, "retrieved token temporary status should match stored status")

	_, err = memStore.GetTokenData(context.Background(), "nonExistingToken")
	assert.Error(t, err, "retrieving non-existing token should produce an error")
	assert.Equal(t, ErrTokenNotFound, err, "error should be ErrTokenNotFound for non-existing token")
}
