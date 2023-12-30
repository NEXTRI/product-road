package passwordless

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"math/big"
	"strconv"
	"time"
)

// TokenType represents the type of token.
type TokenType string

const (
  TokenTypeString = "string"
  TokenTypePin = "pin"
)

// TokenGenerator represents an interface for generating and validating tokens.
type TokenGenerator interface {
	Generate() (string, error)
  GetExpiryTime() time.Time
}

// TokenConfig represents configuration options for a token.
type TokenConfig struct {
	Type       TokenType
	ExpiryTime time.Duration
  Length int
}

// Token represents a token with its type and configuration.
type Token struct {
	Config TokenConfig
  ExpiryTime time.Time
}

// NewToken creates a new token with the specified configuration.
func NewToken(config TokenConfig) *Token {
	return &Token{
		Config:     config,
		ExpiryTime: time.Now().Add(config.ExpiryTime),
	}
}

// generateNumericPIN generates a random numeric PIN with the specified length.
func GenerateNumericPIN(length int) (string, error) {
  pinValue := ""

  for i := 0; i < length; i++ {
    digit, err := rand.Int(rand.Reader, big.NewInt(10))
    if err != nil {
			return "", err
		}
    pinValue += strconv.Itoa(int(digit.Int64()))
  }
  return pinValue, nil
}

// Generate generates a random token based on the token type and length.
func (t *Token) Generate() (string, error) {

  if t.Config.Type == TokenTypePin {
		return GenerateNumericPIN(t.Config.Length)
	}

  tokenBytes := make([]byte, t.Config.Length)
  _, err := rand.Read(tokenBytes)
  if err != nil {
		return "", err
	}

  hashedToken := sha256.Sum256(tokenBytes)

  tokenValue := base64.RawStdEncoding.EncodeToString(hashedToken[:])

  return tokenValue, nil
}

// GetExpiryTime returns the expiry time of the token.
func (t *Token) GetExpiryTime() time.Time {
	return t.ExpiryTime
}
