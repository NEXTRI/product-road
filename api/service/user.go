package service

import (
	"context"
	"errors"

	"github.com/nextri/product-road/db"
	"github.com/nextri/product-road/model"
)

// UserService handles business logic for users.
type UserService struct {
	repo db.UserRepository
}

// NewUserService creates a new instance of UserService.
func NewUserService(repo db.UserRepository) *UserService {
	return &UserService{repo}
}

// CreateUser creates a new user.
func (s *UserService) CreateUser(ctx context.Context, user *model.User) error {
	exists, err := s.repo.CheckEmailExists(ctx, user.Email)
	if err != nil {
		return err
	}
	if exists {
		return errors.New("email already exists")
	}

	if err := s.repo.CreateUser(ctx, user); err != nil {
		return err
	}

	return nil
}

// GetUserByID retrieves a user by ID.
func (s *UserService) GetUserByID(ctx context.Context, id int) (*model.User, error) {
	return s.repo.GetUserByID(ctx, id)
}

// GetUserByEmail retrieves a user by email.
func (s *UserService) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	return s.repo.GetUserByEmail(ctx, email)
}

// CheckEmailExists checks if an email already exists in the database.
func (s *UserService) CheckEmailExists(ctx context.Context, email string) (bool, error) {
  return s.repo.CheckEmailExists(ctx, email)
}
