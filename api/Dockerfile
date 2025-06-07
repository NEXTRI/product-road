# Use an official Go runtime as a parent image
FROM golang:1.24-alpine

# Set the working directory to /app
WORKDIR /app

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod ./
COPY go.sum ./
RUN go mod download && go mod verify

# Copy the current directory contents into the container at /app
COPY . .

# Build the backend binary
RUN go build -v -o main .

# Expose port 8080 to the outside world
EXPOSE 8080

# Run the executable
CMD ["./main"]
