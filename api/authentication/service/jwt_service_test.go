package service

import (
	"testing"

	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
)

func TestGenerateToken(t *testing.T) {
  jwtService := NewJWTService()
  email := "test@example.com"
  tokenString, err := jwtService.GenerateToken(email)

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

func TestValidateToken(t *testing.T) {
  jwtService := NewJWTService()
  email := "test@example.com"
  tokenString, _ := jwtService.GenerateToken(email)

  claims, err := jwtService.ValidateToken(tokenString)
  assert.Nil(t, err)
  assert.Equal(t, email, claims.Email)

  _, err = jwtService.ValidateToken("invalid.token.here")
  assert.NotNil(t, err)
}
