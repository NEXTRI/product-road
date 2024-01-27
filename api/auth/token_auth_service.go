package auth

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("K2Lh0k5F4WhaU8@@1879996")

// TokenType defines the type of JWT token (access or refresh).
type TokenType string

const (
	AccessToken  TokenType = "access"
	RefreshToken TokenType = "refresh"
)

type Claims struct {
  Email string `json:"email"`
  jwt.RegisteredClaims
}

type TokenAuthService interface {
  GenerateAuthToken(email string, tokenType TokenType) (string, error)
  ValidateAuthToken(tokenString string) (*Claims, error)
}

type tokenAuthServiceImpl struct {
  secretKey []byte
}

// NewTokenAuthService creates a new instance of TokenAuthService with the provided secret key.
func NewTokenAuthService() TokenAuthService {
	return &tokenAuthServiceImpl{ secretKey: jwtKey}
}

// GenerateToken generates a new JWT token for a given email
func (j *tokenAuthServiceImpl) GenerateAuthToken(email string, tokenType TokenType) (string, error) {
  var expirationTime time.Time

	switch tokenType {
	case AccessToken:
		expirationTime = time.Now().Add(15 * time.Minute)
	case RefreshToken:
		expirationTime = time.Now().Add(24 * time.Hour)
	default:
    return "", fmt.Errorf("invalid token type: %s", tokenType)
	}
	
  claims := &Claims{
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			Issuer:    "product-road",
		},
	}

  token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
  tokenString, err := token.SignedString(j.secretKey)

	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// ValidateToken checks the token string, parses the token, and returns the claims
func (j *tokenAuthServiceImpl) ValidateAuthToken(tokenString string) (*Claims, error) {
  claims := &Claims{}

  token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
    if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
      return nil, jwt.ErrSignatureInvalid
    }
    return j.secretKey, nil
  })

  if err != nil {
    return nil, err
  }

  if !token.Valid {
    return nil, jwt.ErrTokenUnverifiable
  }

  return claims, nil
}
