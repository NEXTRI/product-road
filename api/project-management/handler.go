package projectmanagement

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/nextri/product-road/model"
	"github.com/nextri/product-road/service"
)

var pmService  *service.ProjectService

func InitServices(pm *service.ProjectService) {
  pmService = pm
}

// Response represents the JSON response structure
type Response struct {
	Message       string           `json:"message"`
	Error         string           `json:"error,omitempty"`
	Project       *model.Project   `json:"project,omitempty"`
	Projects      []*model.Project `json:"projects,omitempty"`
}

// RequestData represents the JSON request data structure
type RequestData struct {
	Name        string    `json:"name"`
	UserID      int       `json:"user_id"`
	Description string    `json:"description"`
}

// writeJSONResponse writes a JSON response to the provided http.ResponseWriter
func writeJSONResponse(w http.ResponseWriter, status int, resp Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(resp)
}

// GetProjectsHandler handles the retrieval of all projects.
func GetAllProjectsHandler(w http.ResponseWriter, r *http.Request) {
	// INFO: temporary get user id from header X-User-ID, will be removed later after auth is implemented properly
	userID, _ := strconv.Atoi(r.Header.Get("X-User-ID"))

	projects, err := pmService.GetAllProjects(r.Context(), userID)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error:   err.Error(),
			Message: "Failed to retrieve projects",
		})
		return
	}

	writeJSONResponse(w, http.StatusOK, Response{
		Message: "Projects retrieved successfully",
		Projects: projects,
	})
}

// GetProjectHandler handles the retrieval of a project by ID.
func GetProjectHandler(w http.ResponseWriter, r *http.Request) {
	idString := r.PathValue("id")

	// INFO: temporary get user id from header X-User-ID, will be removed later after auth is implemented properly
	userID, _ := strconv.Atoi(r.Header.Get("X-User-ID"))

	projectId, err := strconv.Atoi(idString)
	if err != nil {
		writeJSONResponse(w, http.StatusBadRequest, Response{
			Error:   err.Error(),
			Message: "Invalid project ID",
		})
		return
	}

	project, err := pmService.GetProjectByID(r.Context(), projectId, userID)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error:   err.Error(),
			Message: "Failed to retrieve project",
		})
		return
	}

	writeJSONResponse(w, http.StatusOK, Response{
		Message: "Project retrieved successfully",
		Project: project,
	})
}

// CreateProjectHandler handles the creation of a new project.
func CreateProjectHandler(w http.ResponseWriter, r *http.Request) {
	var requestData RequestData
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		writeJSONResponse(w, http.StatusBadRequest, Response{
			Error:   err.Error(),
			Message: "Invalid request body",
		})
		return
	}

	project := &model.Project{
		Name:        requestData.Name,
		UserID:      requestData.UserID,
		Description: requestData.Description,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	}

	projectID, err := pmService.CreateProject(r.Context(), project)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error:   err.Error(),
			Message: "Failed to create project",
		})
		return
	}

	project.ID = projectID

	writeJSONResponse(w, http.StatusCreated, Response{
		Message: "Project created successfully",
		Project: project,
	})
}

// UpdateProjectHandler handles the update of a project by ID.
func UpdateProjectHandler(w http.ResponseWriter, r *http.Request) {
	idString := r.PathValue("id")

	projectID, err := strconv.Atoi(idString)
	if err != nil {
		writeJSONResponse(w, http.StatusBadRequest, Response{
			Error:   "Invalid project ID format",
			Message: "Invalid project ID",
		})
		return
	}

	var requestData RequestData
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		writeJSONResponse(w, http.StatusBadRequest, Response{
			Error:   err.Error(),
			Message: "Invalid request body",
		})
		return
	}

	project := &model.Project{
		ID:          projectID,
		Name:        requestData.Name,
		UserID:      requestData.UserID,
		Description: requestData.Description,
		UpdatedAt:   time.Now(),
	}

	err = pmService.UpdateProject(r.Context(), project)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error:   err.Error(),
			Message: "Failed to update project",
		})
		return
	}

	writeJSONResponse(w, http.StatusOK, Response{
		Message: "Project updated successfully",
		Project: project,
	})
}

// DeleteProjectHandler handles the deletion of a project by ID.
func DeleteProjectHandler(w http.ResponseWriter, r *http.Request) {
	idString := r.PathValue("id")

	projectID, err := strconv.Atoi(idString)
	if err != nil {
		writeJSONResponse(w, http.StatusBadRequest, Response{
			Error:   "Invalid project ID format",
			Message: "Invalid project ID",
		})
		return
	}

	err = pmService.DeleteProject(r.Context(), projectID)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error:   err.Error(),
			Message: "Failed to delete project",
		})
		return
	}

	writeJSONResponse(w, http.StatusOK, Response{
		Message: "Project deleted successfully",
	})
}
