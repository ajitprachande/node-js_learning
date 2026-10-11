# Docker Introduction & Custom Node.js Image 🐳

## 📌 On this day i learnt

Introduction to Docker and containerization. I created my own custom Docker image using `Ubuntu` as the base image and installed Node.js 24 inside it.

The goal is to understand how Docker images work, how to configure an environment using a Dockerfile, and how to run a Node.js application inside a container.

## 🐳 So what is Docker?

Docker is a platform that allows developers to package applications and their dependencies into containers. It helps applications run consistently across different environments.

### Key Docker Concepts

| Concept | Description |
|---|---|
| Dockerfile | A file containing instructions to build a Docker image. |
| Docker Image | A template used to create containers. |
| Docker Container | An isolated environment in which an application runs. |
| Docker Hub | A platform for storing and sharing Docker images. |
| Base Image | The starting image used to build a custom image. |
| Docker Engine | The technology responsible for building and running containers. |

## Technologies Used

- Ubuntu
- Docker
- Node.js 24
- npm
- Dockerfile

## Project Structure

```text
day-20/
├── Dockerfile
├── index.js
├── package.json
├── package-lock.json
├── .dockerignore
└── README.md
```

## Understanding Dockerfile Instructions

- **FROM:** Specifies the base image.
- **RUN:** Executes commands during image building.
- **COPY:** Copies files from the build context into the image.
- **WORKDIR:** Sets the working directory for subsequent instructions.
- **CMD:** Specifies the default command to run when a container starts.

## to execute my project:
### 1. Build your Docker image named  `my-app`
```bash
docker build -t my-app . 
```
### 2. Run a container with terminal

```bash
docker run -it my-app
```
## Other Docker Commands

### 1. Verify Docker Installation

```bash
docker --version
```

### 2. Build the Custom Image

```bash
docker build -t my-node-app .
```

### 3. List Docker Images

```bash
docker images
```

### 4. Run a Container

```bash
docker run -it --name my-node-container my-node-app
```

### 5. View Running Containers

```bash
docker ps
```

### 6. View All Containers

```bash
docker ps -a
```

### 7. View Container Logs

```bash
docker logs my-node-container
```

### 8. Stop a Container

```bash
docker stop my-node-container
```

### 9. Remove a Container

```bash
docker rm my-node-container
```

### 10. Remove a Docker Image

```bash
docker rmi my-node-app
```

## Using a .dockerignore File

Create a `.dockerignore` file to prevent unnecessary files from being sent to Docker during the build process.

```text
node_modules
.git
.env
npm-debug.log
```

**Security Tip:** Never copy your `.env` file into a Docker image. Pass environment variables when starting the container instead.

```bash
docker run --env-file .env --name my-node-container my-node-app
```

## 💡 What I Learned

- Understanding Docker and containerization.
- Creating a custom Docker image using Ubuntu.
- Installing Node.js inside a Docker image.
- Writing a Dockerfile.
- Building images using `docker build`.
- Running containers using `docker run`.
- Managing containers and images using Docker commands.
- Understanding `.dockerignore` and environment variable security.
- 
---

**My Goal:** Learn Docker through practical implementation by creating and running a custom Docker image for a Node.js application.
