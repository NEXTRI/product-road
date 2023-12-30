package passwordless

import (
	"context"
	"sync"
	"time"
)

// UserToken contains token details and an indicator for temporary user status.
type UserToken struct {
  Email   string
  Token   string
  Expires time.Time
  IsTemp  bool // Flag to indicate if it's a temporary user
}

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
func (s *MemoryStore) StoreUserToken(ctx context.Context, email, token string, ttl time.Duration, isTemp bool) error {
	s.mx.Lock()
	defer s.mx.Unlock()

	expires := time.Now().Add(ttl)
	s.tokens[email] = UserToken{
		Email:   email,
		Token:   token,
		Expires: expires,
		IsTemp:  isTemp,
	}
	return nil
}

// Exists checks if a token exists in the MemStore.
func (s *MemoryStore) Exists(ctx context.Context, email string) (bool, time.Time, error) {
	s.mx.Lock()
	defer s.mx.Unlock()

	if t, ok := s.tokens[email]; ok {
		return !t.IsTemp && !time.Now().After(t.Expires), t.Expires, nil
	}
	return false, time.Time{}, nil
}

// Verify checks if a token is valid for the specified email in the MemStore.
func (s *MemoryStore) Verify(ctx context.Context, email, token string) (bool, error) {
	s.mx.Lock()
	defer s.mx.Unlock()

	if t, ok := s.tokens[email]; ok {
		return t.Token == token && !time.Now().After(t.Expires), nil
	}
	return false, ErrTokenNotFound
}

// Delete removes a token from the store.
func (s *MemoryStore) Delete(ctx context.Context, email string) error {
	s.mx.Lock()
	defer s.mx.Unlock()

	delete(s.tokens, email)
	return nil
}

// Clean removes expired entries from the store.
func (s *MemoryStore) Clean() {
	s.mx.Lock()
	defer s.mx.Unlock()

	now := time.Now()
	for email, token := range s.tokens {
		if now.After(token.Expires) {
			delete(s.tokens, email)
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
