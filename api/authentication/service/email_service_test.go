package service

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/nextri/product-road/passwordless"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockTokenStore struct {
	mock.Mock
}

func (m *MockTokenStore) StoreUserToken(ctx context.Context, email, token string, ttl time.Duration, isTemp bool) error {
	args := m.Called(ctx, email, token, ttl, isTemp)
	return args.Error(0)
}

func (m *MockTokenStore) Exists(ctx context.Context, email string) (bool, time.Time,error) {
	args := m.Called(ctx, email)
	return args.Bool(0), args.Get(1).(time.Time), args.Error(2)
}

func (m *MockTokenStore) Verify(ctx context.Context, email, token string) (bool, error) {
	args := m.Called(ctx, email, token)
	return args.Bool(0), args.Error(1)
}

func (m *MockTokenStore) Delete(ctx context.Context, email string) error {
	args := m.Called(ctx, email)
	return args.Error(0)
}

type MockTransport struct {
	mock.Mock
}

func (m *MockTransport) SendToken(ctx context.Context, email, token string, tokenType passwordless.TokenType, isTemp bool) error {
	args := m.Called(ctx, email, token, tokenType, isTemp)
	return args.Error(0)
}

type MockTokenGenerator struct {
	mock.Mock
}

func (m *MockTokenGenerator) Generate() (string, error) {
	args := m.Called()
	return args.String(0), args.Error(1)
}

func (m *MockTokenGenerator) GetExpiryTime() time.Time {
	args := m.Called()
	return args.Get(0).(time.Time)
}

func TestEmailService_SendToken_MagicLink_ExistingUser(t *testing.T) {
  mockTokenStore := new(MockTokenStore)
  mockTransport := new(MockTransport)
  mockTokenGenerator := new(MockTokenGenerator)

  tokenConfig := passwordless.TokenConfig{
		Type:       passwordless.TokenTypeString,
		ExpiryTime: 5 * time.Minute,
		Length:     32,
	}

  emailService := NewEmailService(mockTokenStore, mockTransport, mockTokenGenerator, tokenConfig)

  mockTokenGenerator.On("Generate").Return(mock.Anything, nil)

  mockTokenStore.On("StoreUserToken", context.Background(), "test@example.com", mock.Anything, mock.Anything, false).Return(nil)

  mockTransport.On("SendToken", context.Background(), "test@example.com", mock.Anything, tokenConfig.Type, false).Return(nil)

  err := emailService.SendToken(context.Background(), "test@example.com", false)

  assert.NoError(t, err, "SendToken should not return an error for existing user")

  mockTokenStore.AssertExpectations(t)
	mockTransport.AssertExpectations(t)
  mockTokenGenerator.AssertExpectations(t)
}

func TestEmailService_SendToken_MagicLink_NewUser(t *testing.T) {
  mockTokenStore := new(MockTokenStore)
  mockTransport := new(MockTransport)
  mockTokenGenerator := new(MockTokenGenerator)

  tokenConfig := passwordless.TokenConfig{
		Type:       passwordless.TokenTypeString,
		ExpiryTime: 5 * time.Minute,
		Length:     32,
	}

  emailService := NewEmailService(mockTokenStore, mockTransport, mockTokenGenerator, tokenConfig)

  mockTokenGenerator.On("Generate").Return(mock.Anything, nil)

  mockTokenStore.On("StoreUserToken", context.Background(), "test@example.com", mock.Anything, mock.Anything, true).Return(nil)

  mockTransport.On("SendToken", context.Background(), "test@example.com", mock.Anything, tokenConfig.Type, true).Return(nil)

  err := emailService.SendToken(context.Background(), "test@example.com", true)

  assert.NoError(t, err, "SendToken should not return an error for new user")

  mockTokenStore.AssertExpectations(t)
	mockTransport.AssertExpectations(t)
  mockTokenGenerator.AssertExpectations(t)
}

func TestEmailService_SendTokenMagicLink_NewUser_ErrorOnTokenGeneration(t *testing.T) {
 
  mockTokenStore := new(MockTokenStore)
  mockTransport := new(MockTransport)
  mockTokenGenerator := new(MockTokenGenerator)

  tokenConfig := passwordless.TokenConfig{
		Type:       passwordless.TokenTypeString,
		ExpiryTime: 5 * time.Minute,
		Length:     32,
	}

  emailService := NewEmailService(mockTokenStore, mockTransport, mockTokenGenerator, tokenConfig)

  mockTokenGenerator.On("Generate").Return("", errors.New("mock generate error"))

  mockTokenStore.On("StoreUserToken", context.Background(), "test@example.com", mock.Anything, mock.Anything, true).Return(errors.New("unexpected call to StoreUserToken"))

  mockTransport.On("SendToken", context.Background(), "test@example.com", mock.Anything, tokenConfig.Type, true).Return(errors.New("unexpected call to SendToken"))

  err := emailService.SendToken(context.Background(), "test@example.com", true)

  assert.Error(t, err, "SendToken should return an error")

  mockTokenStore.AssertNotCalled(t, "StoreUserToken")
  mockTransport.AssertNotCalled(t, "SendToken")
  mockTokenGenerator.AssertExpectations(t)
}

func TestEmailService_SendTokenMagicLink_NewUser_ErrorOnStore(t *testing.T) {
 
  mockTokenStore := new(MockTokenStore)
  mockTransport := new(MockTransport)
  mockTokenGenerator := new(MockTokenGenerator)

  tokenConfig := passwordless.TokenConfig{
		Type:       passwordless.TokenTypeString,
		ExpiryTime: 5 * time.Minute,
		Length:     32,
	}

  emailService := NewEmailService(mockTokenStore, mockTransport, mockTokenGenerator, tokenConfig)

  mockTokenGenerator.On("Generate").Return(mock.Anything, nil)

  mockTokenStore.On("StoreUserToken", context.Background(), "test@example.com", mock.Anything, mock.Anything, true).Return(errors.New("mock StoreUserToken error"))

  mockTransport.On("SendToken", context.Background(), "test@example.com", mock.Anything, tokenConfig.Type, true).Return(errors.New("unexpected call to SendToken"))

  err := emailService.SendToken(context.Background(), "test@example.com", true)

  assert.Error(t, err, "SendToken should return an error")

  mockTokenStore.AssertExpectations(t)
  mockTransport.AssertNotCalled(t, "SendToken")
  mockTokenGenerator.AssertExpectations(t)
}

func TestEmailService_SendTokenMagicLink_NewUser_ErrorOnSend(t *testing.T) {
 
  mockTokenStore := new(MockTokenStore)
  mockTransport := new(MockTransport)
  mockTokenGenerator := new(MockTokenGenerator)

  tokenConfig := passwordless.TokenConfig{
		Type:       passwordless.TokenTypeString,
		ExpiryTime: 5 * time.Minute,
		Length:     32,
	}

  emailService := NewEmailService(mockTokenStore, mockTransport, mockTokenGenerator, tokenConfig)

  mockTokenGenerator.On("Generate").Return(mock.Anything, nil)

  mockTokenStore.On("StoreUserToken", context.Background(), "test@example.com", mock.Anything, mock.Anything, true).Return(nil)

  mockTransport.On("SendToken", context.Background(), "test@example.com", mock.Anything, tokenConfig.Type, true).Return(errors.New("mock sendToken error"))

  mockTokenStore.On("Delete", context.Background(), "test@example.com").Return(nil)

  err := emailService.SendToken(context.Background(), "test@example.com", true)

  assert.Error(t, err, "SendToken should return an error")

  mockTokenStore.AssertExpectations(t)
  mockTransport.AssertExpectations(t)
  mockTokenGenerator.AssertExpectations(t)
}
