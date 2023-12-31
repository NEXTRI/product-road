package handler

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/nextri/product-road/authentication/model"
	"github.com/nextri/product-road/authentication/service"
	"github.com/nextri/product-road/authentication/utils"
)

var (
	userService  *service.UserService
	emailService *service.EmailService
  jwtService service.JWTService
)

func InitServices(us *service.UserService, es *service.EmailService, js service.JWTService) {
  userService = us
  emailService = es
  jwtService = js
}

// Response represents the JSON response structure
type Response struct {
	Message string `json:"message"`
	Error   string `json:"error,omitempty"`
  Token   string `json:"token,omitempty"`
}

type RequestData struct {
  Email string `json:"email"`
}

// writeJSONResponse writes a JSON response to the provided http.ResponseWriter
func writeJSONResponse(w http.ResponseWriter, status int, resp Response) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(resp)
}

// LoginHandler manages the user authentication request.
func LoginHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != http.MethodPost {
    http.Error(w, "Only POST method is allowed", http.StatusMethodNotAllowed)
    return
  }
  
  var data RequestData

  err := json.NewDecoder(r.Body).Decode(&data)
  if err != nil {
    http.Error(w, err.Error(), http.StatusBadRequest)
    return
  }
  defer r.Body.Close()

  if err := utils.ValidateEmail(data.Email); err != nil {
    writeJSONResponse(w, http.StatusBadRequest, Response{
      Error: err.Error(),
      Message: "Invalid email format",
    })
    return
  }

  exists, err := userService.CheckEmailExists(r.Context(), data.Email)

  if err != nil {
    writeJSONResponse(w, http.StatusInternalServerError, Response{
      Error: err.Error(),
      Message: "Internal Server Error",
    })
    return
  }

  err = emailService.SendToken(r.Context(), data.Email, !exists)

  if err != nil {
    writeJSONResponse(w, http.StatusInternalServerError, Response{
			Error: err.Error(),
      Message: "Failed to send token",
		})
		return
  }

  writeJSONResponse(w, http.StatusOK, Response{
		Message: "Token sent, check your email box",
	})
}

type MagicLinkBodyRequest struct {
  Token string `json:"token"`
  Email string `json:"email"`
  Status string `json:"userStatus"`
}

// MagicLinkVerificationHandler verifies the token from the magic link & generates a JWT token.
func MagicLinkVerificationHandler(w http.ResponseWriter, r *http.Request) {
  if r.Method != http.MethodPost {
    http.Error(w, "Only POST method is allowed", http.StatusMethodNotAllowed)
    return
  }

  var bodyReq MagicLinkBodyRequest

  err := json.NewDecoder(r.Body).Decode(&bodyReq)
  if err != nil {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "invalid request format",
      Error: err.Error(),
    })
    return
  }
  defer r.Body.Close()

  if bodyReq.Token == "" || bodyReq.Email == "" {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "email and token are required",
      Error: err.Error(),
    })
    return
  }

  isValid, err := emailService.VerifyToken(r.Context(), bodyReq.Email, bodyReq.Token)

  if err != nil || !isValid {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "invalid or expired token",
      Error: err.Error(),
    })
    return
  }

  if bodyReq.Status == "temporary" {
    user := &model.User{Email: bodyReq.Email}
    err = userService.CreateUser(r.Context(), user)

    if err != nil {
      writeJSONResponse(w, http.StatusInternalServerError, Response{
        Message: "Failed to create user",
        Error: err.Error(),
      })
      return
    }
  }

  accessToken, err := jwtService.GenerateToken(bodyReq.Email)

  if err != nil {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "failed to generate token",
      Error: err.Error(),
    })
    return
  }

  // Delete the token from the store (for both temporary and existing users)
  err = emailService.DeleteToken(r.Context(), bodyReq.Email)
  if err != nil {
    // TODO: handle error properly
    log.Printf("Error deleting token for email %s: %v", bodyReq.Email, err)
  }

  writeJSONResponse(w, http.StatusOK, Response{
    Message: "Authentication successful",
    Token:   accessToken,
  })
}
