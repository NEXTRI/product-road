package service

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("K2Lh0k5F4WhaU8@@1879996")

type Claims struct {
  Email string `json:"email"`
  jwt.RegisteredClaims
}

type JWTService interface {
  GenerateToken(email string) (string, error)
  ValidateToken(tokenString string) (*Claims, error)
}

type jwtService struct {
  secretKey []byte
}

// NewJWTService creates a new JWTService with the secret key
func NewJWTService() JWTService {
	return &jwtService{ secretKey: jwtKey}
}

// GenerateToken generates a new JWT token for a given email
func (j *jwtService) GenerateToken(email string) (string, error) {
  expirationTime := time.Now().Add(15 * time.Minute)
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
func (j *jwtService) ValidateToken(tokenString string) (*Claims, error) {
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
