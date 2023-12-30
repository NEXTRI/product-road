package passwordless

import (
	"crypto/sha256"
	"encoding/base64"
	"strconv"
	"testing"
	"time"
)

func TestTokenGenerator_TokenTypeString(t *testing.T) {
  tokenConfig := TokenConfig{
    Type: TokenTypeString,
    ExpiryTime: 5 * time.Minute,
    Length: 32,
  }

  token := NewToken(tokenConfig)

  generatedToken, err := token.Generate()

  if err != nil {
		t.Errorf("unexpected error during token generation: %v", err)
	}

  decodedToken, err := base64.RawStdEncoding.DecodeString(generatedToken)

	if err != nil {
		t.Errorf("unexpected error during token decoding: %v", err)
	}

  if len(decodedToken) != sha256.Size {
		t.Errorf("expected token length %d, got %d", sha256.Size, len(decodedToken))
	}

  reencodedToken := base64.RawStdEncoding.EncodeToString(decodedToken)
	if reencodedToken != generatedToken {
		t.Errorf("re-encoded token does not match the original token. Expected: %s, Got: %s", generatedToken, reencodedToken)
	}
}

func TestGenerateNumericPIN(t *testing.T) {
  tests := []struct {
		length int
	}{
		{length: 4},
		{length: 6},
		{length: 8},
	}

  for _, tc := range tests {
    t.Run(strconv.Itoa(tc.length), func(t *testing.T) {
      pin, err := GenerateNumericPIN(tc.length)

      if err != nil {
				t.Errorf("unexpected error during PIN generation: %v", err)
			}

      if len(pin) != tc.length {
				t.Errorf("expected PIN length %d, got %d", tc.length, len(pin))
			}

      for _, digit := range pin {
				if digit < '0' || digit > '9' {
					t.Errorf("PIN contains non-numeric character: %c", digit)
				}
			}
    })
  }
}

func TestTokenGenerator_TokenTypePin(t *testing.T) {
  tokenConfig := TokenConfig{
    Type: TokenTypePin,
    ExpiryTime: 5 * time.Minute,
    Length: 6,
  }

  token := NewToken(tokenConfig)

  generatedPin, err := token.Generate()

  if err != nil {
		t.Errorf("unexpected error during PIN generation: %v", err)
	}

  if len(generatedPin) != tokenConfig.Length {
		t.Errorf("expected PIN token length %d, got %d", tokenConfig.Length, len(generatedPin))
	}

  for _, digit := range generatedPin {
		if digit < '0' || digit > '9' {
			t.Errorf("PIN token contains non-numeric character: %c", digit)
		}
	}
}

func TestGetExpiryTime_ValidToken(t *testing.T) {
  tokenConfig := TokenConfig{
    Type:       TokenTypeString,
    ExpiryTime: 7 * time.Minute,
    Length:     32,
  }

  token := NewToken(tokenConfig)

  now := time.Now().Add(6 * time.Minute)

  if !token.GetExpiryTime().After(now) {
    t.Error("expected token to be valid, but it is expired.")
  }
}

func TestGetExpiryTime_ExpiredToken(t *testing.T) {
  tokenConfig := TokenConfig{
		Type:       TokenTypeString,
		ExpiryTime: 7 * time.Minute,
		Length:     32,
	}

  token := NewToken(tokenConfig)

  now := time.Now().Add(8 * time.Minute)

  if !now.After(token.GetExpiryTime()) {
    t.Error("expected token to be expired, but it is not.")
  }
}
