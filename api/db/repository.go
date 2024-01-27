package db

import (
	"context"

	"github.com/nextri/product-road/model"
)

// UserRepository defines the interface for user-related data access operations.
type UserRepository interface {
	CheckEmailExists(ctx context.Context, email string) (bool, error)
	CreateUser(ctx context.Context, user *model.User) error
	GetUserByID(ctx context.Context, id int) (*model.User, error)
	GetUserByEmail(ctx context.Context, email string) (*model.User, error)
}
