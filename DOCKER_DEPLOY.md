# Movieflix Docker Deployment

## Docker Compose Options

### 1. Using Pre-built Images from Docker Hub (Production)

Use the default docker-compose.yml to pull images from Docker Hub:

```bash
docker-compose up -d
```

This will:
- Pull `gsukeshreddy13/movieflix-frontend:latest`
- Pull `gsukeshreddy13/movieflix-backend:latest`
- Start both containers

Access the app at: http://localhost

### 2. Building from Local Source (Testing)

Use docker-compose.local.yml to build from your local code:

```bash
docker-compose -f docker-compose.local.yml up --build
```

This will:
- Build frontend from `./Movieflix-Frontend`
- Build backend from `./Movieflix-Backend`
- Start both containers

Access the app at: http://localhost

### 3. Development with Hot Reload (Development)

Use docker-compose.dev.yml for development with volume mounts and hot-reload:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will:
- Mount source code as volumes for live code changes
- Use development servers (Vite dev server for frontend)
- Enable hot-reload without rebuilding containers
- Frontend: http://localhost:5173
- Backend: http://localhost:5051

### 4. Switching Between Modes

**To use local builds in docker-compose.yml:**
Uncomment the `build:` sections and comment out the `image:` lines.

**To pull from Docker Hub:**
Keep `image:` uncommented and `build:` commented (default).

## CI/CD Pipeline

The GitHub Actions pipeline automatically:
- Builds Docker images on push to main/develop
- Pushes to Docker Hub with multiple tags
- Supports semantic versioning (e.g., v1.0.0)
- Builds for multiple platforms (amd64, arm64)

## Secrets Required

Add to GitHub repository secrets:
- `DOCKERHUB_USERNAME`: gsukeshreddy13
- `DOCKERHUB_TOKEN`: Your Docker Hub access token
