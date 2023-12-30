package repository

import (
	"context"

	"github.com/nextri/product-road/authentication/model"
)

// Repository represent the repositories
type Repository interface {
	CheckEmailExists(ctx context.Context, email string) (bool, error)
	CreateUser(ctx context.Context, user *model.User) error
	GetUserByID(ctx context.Context, id int) (*model.User, error)
	GetUserByEmail(ctx context.Context, email string) (*model.User, error)
}
