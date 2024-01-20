package passwordless

import (
	"context"
	"testing"
	"time"
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
