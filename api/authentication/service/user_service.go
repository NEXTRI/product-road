package service

import (
	"context"

	"github.com/nextri/product-road/authentication/model"
	"github.com/nextri/product-road/authentication/repository"
)

type UserService struct {
  repo repository.Repository
}

func NewUserService(repo repository.Repository) *UserService {
  return &UserService{repo}
}

// CreateUser creates a new user to the database.
func (s *UserService) CreateUser(ctx context.Context, user *model.User) error {
  if err := s.repo.CreateUser(ctx, user); err != nil {
		return err
	}

  return nil
}

// CheckEmailExists checks if an email already exists in the database.
func (s *UserService) CheckEmailExists(ctx context.Context, email string) (bool, error) {
  return s.repo.CheckEmailExists(ctx, email)
}
