package projectmanagement

import (
	"encoding/json"
	"net/http"
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

// CreateProjectHandler handles the creation of a new project.
func CreateProjectHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		writeJSONResponse(w, http.StatusMethodNotAllowed, Response{
			Error:   "Only POST method is allowed",
			Message: "Invalid HTTP method",
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
