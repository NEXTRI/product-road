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
	emailTokenService *service.EmailTokenService
  tokenAuthService service.TokenAuthService
)

func InitServices(us *service.UserService, ets *service.EmailTokenService, tas service.TokenAuthService) {
  userService = us
  emailTokenService = ets
  tokenAuthService = tas
}

// Response represents the JSON response structure
type Response struct {
	Message string `json:"message"`
	Error   string `json:"error,omitempty"`
  AccessToken   string `json:"access_token,omitempty"`
	RefreshToken   string `json:"refresh_token,omitempty"`
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

  err = emailTokenService.SendToken(r.Context(), data.Email, !exists)

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

  if bodyReq.Token == "" {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "token is required",
      Error: err.Error(),
    })
    return
  }

  isValid, err := emailTokenService.VerifyToken(r.Context(), bodyReq.Token)

	if !isValid {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "invalid or expired token",
      Error: err.Error(),
    })
    return
  }

  if err != nil {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "error verifying token",
      Error: err.Error(),
    })
    return
  }

	tokenData, err := emailTokenService.GetTokenData(r.Context(), bodyReq.Token)

	if err != nil {
		writeJSONResponse(w, http.StatusInternalServerError, Response{
			Message: "Failed to retrieve token data",
			Error: err.Error(),
		})
		return
	}

  if tokenData.IsTemp {
    user := &model.User{Email: tokenData.Email}
    err = userService.CreateUser(r.Context(), user)

    if err != nil {
      writeJSONResponse(w, http.StatusInternalServerError, Response{
        Message: "Failed to create user",
        Error: err.Error(),
      })
      return
    }
  }

  accessToken, err := tokenAuthService.GenerateAuthToken(tokenData.Email, "access")
	if err != nil {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "failed to generate access token",
      Error: err.Error(),
    })
    return
  }

	refreshToken, err := tokenAuthService.GenerateAuthToken(tokenData.Email, "refresh")

  if err != nil {
    writeJSONResponse(w, http.StatusOK, Response{
      Message: "failed to generate refresh token",
      Error: err.Error(),
    })
    return
  }

  // Delete the token from the store (for both temporary and existing users)
  err = emailTokenService.DeleteToken(r.Context(), bodyReq.Token)
  if err != nil {
    // TODO: handle error properly
    log.Printf("Error deleting token %s: %v", bodyReq.Token, err)
  }

  writeJSONResponse(w, http.StatusOK, Response{
    Message: "Authentication successful",
    AccessToken:   accessToken,
		RefreshToken: refreshToken,
  })
}
