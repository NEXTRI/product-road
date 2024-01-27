package projectmanagement

import "context"

// ProjectService handles business logic for projects.
type ProjectService struct {
	repo *ProjectRepository
}

// NewProjectService creates a new instance of ProjectService.
func NewProjectService(repo *ProjectRepository) *ProjectService {
	return &ProjectService{repo}
}

// CreateProject creates a new project.
func (s *ProjectService) CreateProject(ctx context.Context, project *Project) (int, error) {
	return s.repo.CreateProject(ctx, project)
}

// GetProjectByID retrieves a project by its ID.
func (s *ProjectService) GetProjectByID(ctx context.Context, projectID int) (*Project, error) {
	return s.repo.GetProjectByID(ctx, projectID)
}

// GetAllProjects retrieves all projects for a specific user.
func (s *ProjectService) GetAllProjects(ctx context.Context, userID int) ([]*Project, error) {
	return s.repo.GetAllProjects(ctx, userID)
}

// UpdateProject updates an existing project.
func (s *ProjectService) UpdateProject(ctx context.Context, project *Project) error {
	return s.repo.UpdateProject(ctx, project)
}

// DeleteProject deletes a project by its ID.
func (s *ProjectService) DeleteProject(ctx context.Context, projectID int) error {
	return s.repo.DeleteProject(ctx, projectID)
}
