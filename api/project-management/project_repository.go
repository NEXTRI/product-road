package projectmanagement

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"
)

// ProjectRepository handles database operations related to projects.
type ProjectRepository struct {
	db *sql.DB
}

// NewProjectRepository creates a new instance of ProjectRepository.
func NewProjectRepository(db *sql.DB) *ProjectRepository {
	return &ProjectRepository{db: db}
}

// CreateProject inserts a new project into the database.
func (repo *ProjectRepository) CreateProject(ctx context.Context, project *Project) (int, error) {
	var projectID int

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	err := repo.db.QueryRowContext(ctx, "INSERT INTO projects (name, description, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id", project.Name, project.Description, project.CreatedAt, project.UpdatedAt).Scan(&projectID)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return 0, fmt.Errorf("timeout exceeded while creating project")
		}
		return 0, err
	}

	return projectID, nil
}

// GetProjectByID retrieves a project from the database by its ID.
func (repo *ProjectRepository) GetProjectByID(ctx context.Context, projectID int) (*Project, error) {
	var project Project

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	err := repo.db.QueryRowContext(ctx, "SELECT * FROM projects WHERE id = $1", projectID).Scan(&project.ID, &project.Name, &project.Description, &project.CreatedAt, &project.UpdatedAt)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, fmt.Errorf("timeout exceeded while trying to get project by ID")
		}
		return nil, err
	}

	return &project, nil
}
