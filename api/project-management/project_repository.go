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

	err := repo.db.QueryRowContext(ctx, "INSERT INTO projects (name, user_id, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id", project.Name, project.UserID, project.Description, project.CreatedAt, project.UpdatedAt).Scan(&projectID)

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

	err := repo.db.QueryRowContext(ctx, "SELECT * FROM projects WHERE id = $1", projectID).Scan(&project.ID, &project.Name, &project.UserID, &project.Description, &project.CreatedAt, &project.UpdatedAt)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, fmt.Errorf("timeout exceeded while trying to get project by ID")
		}
		return nil, err
	}

	return &project, nil
}

// GetAllProjects retrieves all projects for a specific user from the database.
func (repo *ProjectRepository) GetAllProjects(ctx context.Context, userID int) ([]*Project, error) {
	var projects []*Project

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	rows, err := repo.db.QueryContext(ctx, "SELECT * FROM projects WHERE user_id = $1", userID)
	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return nil, fmt.Errorf("timeout exceeded while trying to get all projects")
		}
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var project Project
		err := rows.Scan(&project.ID, &project.UserID, &project.Name, &project.Description, &project.CreatedAt, &project.UpdatedAt)
		if err != nil {
			return nil, fmt.Errorf("error scanning project row: %v", err)
		}
		projects = append(projects, &project)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over projects rows: %v", err)
	}

	return projects, nil
}

// UpdateProject updates an existing project in the database.
func (repo *ProjectRepository) UpdateProject(ctx context.Context, project *Project) error {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	result, err := repo.db.ExecContext(ctx,
		"UPDATE projects SET name = $1, description = $2, updated_at = $3 WHERE id = $4",
		project.Name, project.Description, project.UpdatedAt, project.ID,
	)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return fmt.Errorf("timeout exceeded while updating project")
		}
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected after updating project: %v", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no project found with ID %d", project.ID)
	}

	return nil
}

// DeleteProject deletes a project from the database by its ID.
func (repo *ProjectRepository) DeleteProject(ctx context.Context, projectID int) error {
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	result, err := repo.db.ExecContext(ctx, "DELETE FROM projects WHERE id = $1", projectID)

	if err != nil {
		if errors.Is(err, context.DeadlineExceeded) {
			return fmt.Errorf("timeout exceeded while deleting project")
		}
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("error getting rows affected after deleting project: %v", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no project found with ID %d", projectID)
	}

	return nil
}
