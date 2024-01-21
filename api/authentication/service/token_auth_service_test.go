package service

import (
	"testing"

	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
)

func TestTokenAuthService_GenerateAuthToken(t *testing.T) {
  tokenService := NewTokenAuthService()
  email := "test@example.com"
  tokenString, err := tokenService.GenerateAuthToken(email, "access")

  assert.Nil(t, err)
  assert.NotEmpty(t, tokenString)

  token, err := jwt.ParseWithClaims(tokenString, &Claims{}, func(token *jwt.Token) (interface{}, error) {
    return jwtKey, nil
  })

  assert.Nil(t, err)
  if claims, ok := token.Claims.(*Claims); ok && token.Valid {
    assert.Equal(t, email, claims.Email)
  } else {
    t.Fail()
  }
}

func TestTokenAuthService_ValidateAuthToken(t *testing.T) {
  jwtService := NewTokenAuthService()
  email := "test@example.com"
  tokenString, _ := jwtService.GenerateAuthToken(email, "refresh")

  claims, err := jwtService.ValidateAuthToken(tokenString)
  assert.Nil(t, err)
  assert.Equal(t, email, claims.Email)

  _, err = jwtService.ValidateAuthToken("invalidToken")
  assert.NotNil(t, err)
}
