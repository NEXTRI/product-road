package model

import "time"

// User represents a user in the system.
type User struct {
  ID uint
  Username string
  Email string
  FullName string
  ProfilePicture string
  CreatedAt time.Time
  UpdatedAt time.Time
}

// NewUser creates a new user with the given username and email.
func NewUser(username, email, fullName, profilePicture string) *User {
	return &User{
		Username:  username,
		Email:     email,
    FullName:     fullName,
    ProfilePicture:     profilePicture,
		CreatedAt: time.Now(),
    UpdatedAt: time.Now(),
	}
}
