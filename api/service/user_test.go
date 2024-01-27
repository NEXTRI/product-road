package service

import (
	"context"
	"testing"

	"github.com/nextri/product-road/model"
	"github.com/nextri/product-road/utils"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockRepository struct {
	mock.Mock
}

func (m *MockRepository) CheckEmailExists(ctx context.Context, email string) (bool, error) {
	args := m.Called(ctx, email)
	return args.Bool(0), args.Error(1)
}

func (m *MockRepository) CreateUser(ctx context.Context, user *model.User) error {
	args := m.Called(ctx, user)
	return args.Error(0)
}

func (m *MockRepository) GetUserByID(ctx context.Context, id int) (*model.User, error) {
  args := m.Called(id)
  return args.Get(0).(*model.User), args.Error(1)
}

func (m *MockRepository) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
  args := m.Called(email)
  return args.Get(0).(*model.User), args.Error(1)
}

func TestUserService_CreateUser(t *testing.T) {
  repo := new(MockRepository)
	
  userService := NewUserService(repo)

  repo.On("CreateUser", mock.Anything, mock.Anything).Return(utils.ErrEmailExists)

  user := &model.User{
		Email: "test@test.com",
	}

  err := userService.CreateUser(context.Background(), user)

  assert.Error(t, err)

  repo.AssertExpectations(t)
}

func TestUserService_CheckEmailExists(t *testing.T) {
  repo := new(MockRepository)
  userService := NewUserService(repo)

  testEmail := "test@test.com"
  
  repo.On("CheckEmailExists", mock.Anything, testEmail).Return(true, nil)

  exists, err := userService.CheckEmailExists(context.Background(), testEmail)

  assert.NoError(t, err)
  assert.True(t, exists)

  repo.AssertExpectations(t)
}
