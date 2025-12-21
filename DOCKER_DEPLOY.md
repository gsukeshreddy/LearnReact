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

### 2. Building from Local Source (Development)

Use docker-compose.local.yml to build from your local code:

```bash
docker-compose -f docker-compose.local.yml up --build
```

This will:
- Build frontend from `./Movieflix-Frontend`
- Build backend from `./Movieflix-Backend`
- Start both containers

Access the app at: http://localhost

### 3. Switching Between Modes

**To use local builds in docker-compose.yml:**
Uncomment the `build:` sections and comment out the `image:` lines.

**To pull from Docker Hub:**
Keep `image:` uncommented and `build:` commented (default).

## CI/CD Pipeline

The GitHub Actions pipeline automatically:
- Builds Docker images on push to main/develop
- Pushes to Docker Hub with multiple tags
- Supports semantic versioning (e.g., v1.0.0)

## Secrets Required

Add to GitHub repository secrets:
- `DOCKERHUB_USERNAME`: gsukeshreddy13
- `DOCKERHUB_TOKEN`: Your Docker Hub access token
