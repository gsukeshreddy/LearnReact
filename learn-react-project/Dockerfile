
# Stage 1: Build the React app
FROM node:24.2.0 AS build

# Sets the working directory to /app.
# All subsequent commands will run inside this directory.
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copies the entire React app source code (everything in the current directory) into the container.
COPY . .

# Runs the React build script (react-scripts build), creating static files in /app/build.
RUN npm run build

# Stage 2: Serve the app using NGINX
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy React build files to NGINX public folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
