package passwordless

import (
	"context"
	"sync"
	"time"
)

// MemStore is a token store that stores tokens in memory.
type MemoryStore struct {
  mx sync.Mutex
  tokens      map[string]UserToken
  cleaner *time.Ticker
  stopCleaner chan struct{}
}

// NewMemoryStore creates and returns a new MemStore.
func NewMemoryStore()*MemoryStore {
  tk := time.NewTicker(time.Second)

  ms := &MemoryStore{
    tokens:      make(map[string]UserToken),
    cleaner: tk,
    stopCleaner: make(chan struct{}),
  }

  go func(stop chan struct{}) {
    for {
      select {
      case <-tk.C:
        ms.Clean()
      case <-stop:
        tk.Stop()
        return
      }
    }
  }(ms.stopCleaner)

  return ms
}

// StoreUserToken stores a user token in the MemoryStore, with an indication if it's temporary.
func (s *MemoryStore) StoreUserToken(ctx context.Context, token, email string, ttl time.Duration, isTemp bool) error {
	s.mx.Lock()
	defer s.mx.Unlock()

	expires := time.Now().Add(ttl)
	s.tokens[token] = UserToken{
		Email:   email,
		Expires: expires,
		IsTemp:  isTemp,
	}
	return nil
}

// Exists checks if a token exists in the MemStore.
func (s *MemoryStore) Exists(ctx context.Context, token string) (bool, time.Time, error) {
	s.mx.Lock()
	defer s.mx.Unlock()

	if t, ok := s.tokens[token]; ok {
		return !t.IsTemp && !time.Now().After(t.Expires), t.Expires, nil
	}
	return false, time.Time{}, nil
}

// Verify checks if a token is valid in the MemStore.
func (s *MemoryStore) Verify(ctx context.Context, token string) (bool, error) {
	s.mx.Lock()
	defer s.mx.Unlock()

	if t, ok := s.tokens[token]; ok {
		return !time.Now().After(t.Expires), nil
	}
	return false, ErrTokenNotFound
}

// Delete removes a token from the store.
func (s *MemoryStore) Delete(ctx context.Context, token string) error {
	s.mx.Lock()
	defer s.mx.Unlock()

	delete(s.tokens, token)
	return nil
}

// GetTokenData retrieves the user token data associated with a given token.
func (s *MemoryStore) GetTokenData(ctx context.Context, token string) (UserToken, error) {
	s.mx.Lock()
	defer s.mx.Unlock()

	if userToken, ok := s.tokens[token]; ok {
		return userToken, nil
	}
	return UserToken{}, ErrTokenNotFound
}

// Clean removes expired entries from the store.
func (s *MemoryStore) Clean() {
	s.mx.Lock()
	defer s.mx.Unlock()

	now := time.Now()
	for token, tokenData := range s.tokens {
		if now.After(tokenData.Expires) {
			delete(s.tokens, token)
		}
	}
}

// Shutdown stops the periodic cleaner, releases resources, and clears the data map.
func (s *MemoryStore) Shutdown() {
	s.mx.Lock()
	defer s.mx.Unlock()

	s.cleaner.Stop()
	close(s.stopCleaner)
	s.tokens = make(map[string]UserToken)
}
