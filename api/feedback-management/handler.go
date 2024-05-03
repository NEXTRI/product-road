package feedbackmanagement

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/nextri/product-road/model"
	"github.com/nextri/product-road/service"
)

var fmService  *service.FeedbackService

func InitServices(fm *service.FeedbackService) {
  fmService = fm
}

// Response represents the JSON response structure
type Response struct {
	Message       string           `json:"message"`
	Error         string           `json:"error,omitempty"`
	Feedback      *model.Feedback  `json:"feedback,omitempty"`
	Feedbacks     []*model.Feedback `json:"feedbacks,omitempty"`
}

// RequestData represents the JSON request data structure
type RequestData struct {
	UserID    int    `json:"user_id"`
	ProjectID int    `json:"project_id"`
	Title     string `json:"title"`
	Description string `json:"description"`
	Category string `json:"category"`
	Status string `json:"status"`
}

// writeJSONResponse writes a JSON response to the provided http.ResponseWriter
func writeJSONResponse(w http.ResponseWriter, status int, resp Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(resp)
}

// CreateFeedbackHandler handles the creation of a new feedback.
func CreateFeedbackHandler(w http.ResponseWriter, r *http.Request) {
	var requestData RequestData
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		writeJSONResponse(w, http.StatusBadRequest, Response{
			Error:   err.Error(),
			Message: "Invalid request body",
		})
		return
	}

	feedback := &model.Feedback{
		UserID:      requestData.UserID,
		ProjectID:   requestData.ProjectID,
		Title:       requestData.Title,
		Description: requestData.Description,
		Category:    model.FeedbackCategory(requestData.Category),
		Status:      model.FeedbackStatus(requestData.Status),
	}

	feedbackID, err := fmService.CreateFeedback(r.Context(), feedback)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error:   err.Error(),
			Message: "Failed to create feedback",
		})
		return
	}

	feedback.ID = feedbackID
	writeJSONResponse(w, http.StatusOK, Response{
		Message: "Feedback created successfully",
		Feedback: feedback,
	})
}

// GetAllFeedbacksHandler handles the retrieval of all feedbacks for a project.
func GetAllFeedbacksHandler(w http.ResponseWriter, r *http.Request) {

	projectIDString := r.PathValue("project_id")

	projectID, err := strconv.Atoi(projectIDString)

	if err != nil {
		writeJSONResponse(w, http.StatusBadRequest, Response{
			Error:   "Invalid project ID format",
			Message: "Invalid project ID",
		})
		return
	}

	feedbacks, err := fmService.GetAllFeedbacks(r.Context(), projectID)
	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error:   err.Error(),
			Message: "Failed to retrieve feedbacks",
		})
		return
	}

	writeJSONResponse(w, http.StatusOK, Response{
		Message: "Feedbacks retrieved successfully",
		Feedbacks: feedbacks,
	})
}
