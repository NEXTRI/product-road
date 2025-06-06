# Nextly

## Description

Nextly is the tool that helps you move to what’s next — smoothly, insightfully, and continuously. It captures, organizes, and announces product feedback in one place. Built for developers, product managers, and modern startups.

### Project Scope Definition

#### Key Features

- **Feedback Collection**: Users can submit feedback via an in-app form.
- **Feedback Organization**: Categorize and prioritize feedback within the app.
- **Feedback Announcement**: Publish selected feedback and share updates transparently with users.

### Objectives Setting

- Streamline the feedback loop between users and teams.
- Create a single source of truth for product feedback.
- Improve communication and alignment across product and development teams.

### Selected Technologies

- Frontend
  - TanStack Start (React + File-based Routing)
  - TypeScript
  - Tailwind CSS v4
  - shadcn/ui (for accessible, clean UI components)
- Backend: Golang
- Database: Postgres

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js 22.10.0 (recommended via Volta)
- pnpm package manager

### Backend Setup (Docker)

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Create a `.env` file with the following variables:
   ```env
   PGUSER=your_postgres_user
   PGPASSWORD=your_postgres_password
   PGDATABASE=nextly_db
   PGPORT=5432
   PGHOSTPORT=5432
   ```

3. Start the backend services:
   ```bash
   docker-compose up -d
   ```

   This will start:
   - **API Server**: http://localhost:8080
   - **PostgreSQL Database**: localhost:5432
   - **Redis Cache**: localhost:6379

4. To view logs:
   ```bash
   docker-compose logs -f
   ```

5. To stop the services:
   ```bash
   docker-compose down
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

   The frontend will be available at http://localhost:3000

4. Build for production:
   ```bash
   pnpm build
   ```

5. Start production server:
   ```bash
   pnpm start
   ```

### Development Workflow

1. Start backend services: `cd api && docker-compose up -d`
2. Start frontend development: `cd frontend && pnpm dev`
3. Access the application at http://localhost:3000
4. API endpoints available at http://localhost:8080

### Useful Commands

**Backend:**
```bash
# Rebuild and restart API container
docker-compose up --build api

# Access database
docker exec -it product-road-db psql -U your_postgres_user -d nextly_db

# View API logs
docker-compose logs -f api
```
