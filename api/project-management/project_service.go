package projectmanagement

import "context"

// ProjectService handles business logic related to projects.
type ProjectService interface {
	CreateProject(ctx context.Context, project *Project) (int, error)
	GetProjectByID(ctx context.Context, projectID int) (*Project, error)
	GetAllProjects(ctx context.Context, userID int) ([]*Project, error)
	UpdateProject(ctx context.Context, project *Project) error
	DeleteProject(ctx context.Context, projectID int) error
}

// ProjectService handles business logic for projects.
// ProjectServiceImpl is the default implementation of ProjectService.
type ProjectServiceImpl struct {
	repo *ProjectRepository
}

// NewProjectService creates a new instance of ProjectServiceImpl.
func NewProjectService(repo *ProjectRepository) *ProjectServiceImpl {
	return &ProjectServiceImpl{repo: repo}
}

// CreateProject creates a new project.
func (s *ProjectServiceImpl) CreateProject(ctx context.Context, project *Project) (int, error) {
	return s.repo.CreateProject(ctx, project)
}

// GetProjectByID retrieves a project by its ID.
func (s *ProjectServiceImpl) GetProjectByID(ctx context.Context, projectID int) (*Project, error) {
	return s.repo.GetProjectByID(ctx, projectID)
}

// GetAllProjects retrieves all projects for a specific user.
func (s *ProjectServiceImpl) GetAllProjects(ctx context.Context, userID int) ([]*Project, error) {
	return s.repo.GetAllProjects(ctx, userID)
}

// UpdateProject updates an existing project.
func (s *ProjectServiceImpl) UpdateProject(ctx context.Context, project *Project) error {
	return s.repo.UpdateProject(ctx, project)
}

// DeleteProject deletes a project by its ID.
func (s *ProjectServiceImpl) DeleteProject(ctx context.Context, projectID int) error {
	return s.repo.DeleteProject(ctx, projectID)
}
