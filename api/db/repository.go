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

// ProjectRepository defines the interface for project-related data access operations.
type ProjectRepository interface {
	CreateProject(ctx context.Context, project *model.Project) (int, error)
	GetProjectByID(ctx context.Context, projectID, userID int) (*model.Project, error)
	GetAllProjects(ctx context.Context, userID int) ([]*model.Project, error)
	UpdateProject(ctx context.Context, project *model.Project) error
	DeleteProject(ctx context.Context, projectID int) error
}
