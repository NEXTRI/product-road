package passwordless

import (
	"context"
	"encoding/json"
	"testing"
	"time"
)

func TestRedisStore_StoreUserToken_NewUser(t *testing.T) {
	redisStore := NewRedisStore(redisClient)

	email := "newuser@test.com"
  token := "newUserToken123"
  ttl := 5 * time.Minute

	err := redisStore.StoreUserToken(context.Background(), token, email, ttl, true)

	if err != nil {
    t.Fatalf("StoreUserToken failed for a new user: %v", err)
  }

	val, err := redisStore.client.Get(context.Background(), token).Result()

	if err != nil {
		t.Fatalf("failed to get token from Redis: %v", err)
	}

	var userToken UserToken
	err = json.Unmarshal([]byte(val), &userToken)
	if err != nil {
    t.Fatalf("failed to unmarshal user token: %v", err)
  }

	if !userToken.IsTemp {
    t.Error("expected IsTemp to be true for new user, but it was false")
  }
}

func TestRedisStore_StoreUserToken_ExistingUser(t *testing.T) {
	redisStore := NewRedisStore(redisClient)

	email := "existinguser@test.com"
  token := "existingUserToken456"
  ttl := 5 * time.Minute

	err := redisStore.StoreUserToken(context.Background(), token, email, ttl, false)

	if err != nil {
    t.Fatalf("StoreUserToken failed for an existing user: %v", err)
  }

	isValid, err := redisStore.Verify(context.Background(), token)

  if err != nil {
    t.Fatalf("Verify failed for existing user: %v", err)
  }

	if !isValid {
    t.Error("Expected token for existing user to be valid, but it's not.")
  }

	val, err := redisStore.client.Get(context.Background(), token).Result()

	if err != nil {
		t.Fatalf("failed to get token from Redis: %v", err)
	}

	var userToken UserToken
	err = json.Unmarshal([]byte(val), &userToken)
	if err != nil {
    t.Fatalf("failed to unmarshal user token: %v", err)
  }

	if userToken.IsTemp {
    t.Error("Expected IsTemp to be false for existing user, but it was true")
  }
}
