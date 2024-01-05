package passwordless

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"github.com/redis/go-redis/v9"
)

type RedisStore struct {
	client *redis.Client
}

func NewRedisStore(client *redis.Client) *RedisStore {
	return &RedisStore{client}
}

// StoreUserToken stores a user token in Redis with a TTL and a flag indicating if it's temporary.
func (r *RedisStore) StoreUserToken(ctx context.Context, email, token string, ttl time.Duration, isTemp bool) error {
	userToken := UserToken{
		Email: email,
		Token: token,
		Expires: time.Now().Add(ttl),
		IsTemp: isTemp,
	}

	userTokenJSON, err := json.Marshal(userToken)
	if err != nil {
    return err
  }

	remainingTTL := time.Until(userToken.Expires)
	if remainingTTL <= 0 {
		return errors.New("invalid TTL: already expired")
	}

	return r.client.Set(ctx, email, userTokenJSON, remainingTTL).Err()
}

// Exists checks if a token exists in the RedisStore.
func (r *RedisStore) Exists(ctx context.Context, email string) (bool, time.Time, error) {
	val, err := r.client.Get(ctx, email).Result()
	if err == redis.Nil {
		return false, time.Time{}, nil
	} else if err != nil {
		return false, time.Time{}, err
	}

	var userToken UserToken
	err = json.Unmarshal([]byte(val), &userToken)
	if err != nil {
		return false, time.Time{}, err
	}

	if time.Now().After(userToken.Expires) {
    return false, time.Time{}, nil
  }

	return true, userToken.Expires, nil
}

// Verify checks if a token is valid for the specified email in the RedisStore.
func (r *RedisStore) Verify(ctx context.Context, email, token string) (bool, error) {
	val, err := r.client.Get(ctx, email).Result()
	if err == redis.Nil {
		return false, nil
	} else if err != nil {
		return false, err
	}

	var userToken UserToken
  err = json.Unmarshal([]byte(val), &userToken)
	if err != nil {
		return false, err
	}

	if userToken.Token == token && time.Now().Before(userToken.Expires) {
    return true, nil
  }

	return false, nil
}

// Delete removes a token from the RedisStore.
func (r *RedisStore) Delete(ctx context.Context, email string) error {
	result, err := r.client.Del(ctx, email).Result()
	if err != nil {
		return err
	}

	if result == 0 {
		return errors.New("no token found for the specified email")
	}

	return nil
}
