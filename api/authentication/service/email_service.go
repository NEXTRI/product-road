package service

import (
	"context"

	"github.com/nextri/product-road/passwordless"
)

// EmailService is responsible for sending emails with tokens.
type EmailService struct {
	tokenStore    passwordless.TokenStore
	tokenTransport passwordless.Transport
  tokenGenerator passwordless.TokenGenerator
  tokenConfig    passwordless.TokenConfig
}

// NewEmailService creates a new EmailService instance with the provided store and transport.
func NewEmailService(tokenStore passwordless.TokenStore, tokenTransport passwordless.Transport, tokenGenerator passwordless.TokenGenerator, tokenConfig passwordless.TokenConfig) *EmailService {
	return &EmailService{tokenStore, tokenTransport, tokenGenerator, tokenConfig}
}

// SendToken handles the process of sending a token to the user's email.
func (es *EmailService) SendToken(ctx context.Context, email string, isTemp bool) error {

  tokenValue, err := es.tokenGenerator.Generate()
  
  if err != nil {
		return err
	}

  err = es.tokenStore.StoreUserToken(ctx, email, tokenValue, es.tokenConfig.ExpiryTime, isTemp)

  if err != nil {
		return err
	}

  err = es.tokenTransport.SendToken(ctx, email, tokenValue, es.tokenConfig.Type, isTemp)

  if err != nil {
		// If sending fails, delete the stored token
		_ = es.tokenStore.Delete(ctx, email)
		return err
	}

  return nil
}

// VerifyToken checks if the provided token is valid for the specified email.
func (es *EmailService) VerifyToken(ctx context.Context, email, token string) (bool, error) {
  return es.tokenStore.Verify(ctx, email, token)
}

// DeleteToken deletes a token from the token store.
func (es *EmailService) DeleteToken(ctx context.Context, email string) error {
	return es.tokenStore.Delete(ctx, email)
}
