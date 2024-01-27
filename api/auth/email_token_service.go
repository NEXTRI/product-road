package auth

import (
	"context"

	"github.com/nextri/product-road/passwordless"
)

// EmailTokenService handles token generation, storage, and email distribution for authentication.
type EmailTokenService struct {
	tokenStore    passwordless.TokenStore
	tokenTransport passwordless.Transport
  tokenGenerator passwordless.TokenGenerator
  tokenConfig    passwordless.TokenConfig
}

// NewEmailService creates a new EmailTokenService instance with the provided store and transport.
func NewEmailTokenService(tokenStore passwordless.TokenStore, tokenTransport passwordless.Transport, tokenGenerator passwordless.TokenGenerator, tokenConfig passwordless.TokenConfig) *EmailTokenService {
	return &EmailTokenService{tokenStore, tokenTransport, tokenGenerator, tokenConfig}
}

// SendToken handles the process of sending a token to the user's email.
func (es *EmailTokenService) SendToken(ctx context.Context, email string, isTemp bool) error {

  token, err := es.tokenGenerator.Generate()
  
  if err != nil {
		return err
	}

  err = es.tokenStore.StoreUserToken(ctx, token, email, es.tokenConfig.ExpiryTime, isTemp)

  if err != nil {
		return err
	}

  err = es.tokenTransport.SendToken(ctx, email, token, es.tokenConfig.Type)

  if err != nil {
		// If sending fails, delete the stored token
		_ = es.tokenStore.Delete(ctx, token)
		return err
	}

  return nil
}

// VerifyToken checks if the provided token is valid.
func (es *EmailTokenService) VerifyToken(ctx context.Context, token string) (bool, error) {
  return es.tokenStore.Verify(ctx, token)
}

// DeleteToken deletes a token from the token store.
func (es *EmailTokenService) DeleteToken(ctx context.Context, token string) error {
	return es.tokenStore.Delete(ctx, token)
}

// GetTokenData retrieves the data associated with a given token.
func (es *EmailTokenService) GetTokenData(ctx context.Context, token string) (passwordless.UserToken, error) {
  return es.tokenStore.GetTokenData(ctx, token)
}
