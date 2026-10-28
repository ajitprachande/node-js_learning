# Docker Compose

## 1. What is Docker Compose?

Docker Compose is a tool used to **create, run, and manage multiple containers using a single YAML file**.

### Example

A Node.js project may need:
- Node.js application container
- PostgreSQL database container
- Network for communication
- Volume to store database data

Docker Compose helps manage these services together.

## 2. Important Concepts

| Concept | Meaning |
|---|---|
| Image | Template used to create a container |
| Container | Running instance of an image |
| Service | An application component defined in Compose |
| Network | Allows containers to communicate |
| Volume | Stores data persistently |
| Port mapping | Connects a computer's port to a container's port |
| YAML file | Configuration file for Docker Compose |

## 3. Basic Docker Compose Example

Create a file named `compose.yaml`.

```yaml
services:
  db:
    image: postgres:18
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

### Explanation

- `services`: Defines the services.
- `db`: Name of the database service.
- `image`: PostgreSQL image used to create the container.
- `environment`: Sets database configuration.
- `ports`: Maps the computer's port to the container's port.
- `volumes`: Stores database data persistently.
- `db_data`: Name of the Docker volume.

**Note:** Use strong credentials in real projects. These credentials are only for local practice.

## 4. Important Docker Compose Commands

| Command | Use |
|---|---|
| `docker compose up` | Creates and starts services |
| `docker compose up -d` | Starts services in the background |
| `docker compose up --build` | Builds images and starts services |
| `docker compose ps` | Shows service and container status |
| `docker compose logs` | Displays logs |
| `docker compose logs -f db` | Follows database logs |
| `docker compose stop` | Stops running services without removing containers |
| `docker compose start` | Starts previously created stopped containers |
| `docker compose down` | Stops and removes containers and the default network |
| `docker compose down -v` | Also removes Compose-managed named volumes |
| `docker compose config` | Validates and displays the resolved configuration |

### Common Workflow

```bash
# Start containers
docker compose up -d

# Check status
docker compose ps

# Check logs
docker compose logs db

# Stop and remove containers
docker compose down
```

**Warning:** `docker compose down -v` can delete your database data stored in Compose-managed volumes.

## 5. Docker Compose Networking

Docker Compose automatically creates a network for services in a project.

For example, if your services are named `app` and `db`, the Node.js application can connect to PostgreSQL using:

```env
DB_HOST=db
DB_PORT=5432
```

### Remember

- From the app container: use `db:5432`.
- From your computer: use `localhost:5432` if the database port is published.
- Inside a container, `localhost` refers to that same container.

## 6. Port Mapping

Example:

```yaml
ports:
  - "8000:8000"
```

**Format:**

`HOST_PORT:CONTAINER_PORT`

- First `8000`: Port on your computer.
- Second `8000`: Port inside the container.

If host port `5432` is already in use, you can map another host port:

```yaml
ports:
  - "5433:5432"
```

From your computer, connect using `localhost:5433`. Other containers can still use `db:5432`.

## 7. Volumes in Docker Compose

Volumes help preserve data when containers are removed.

```yaml
services:
  db:
    image: postgres:18
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

Here:
- `db_data` is the named volume.
- `/var/lib/postgresql/data` is PostgreSQL's data directory in the container.

When you run:

```bash
docker compose down
```

The named volume normally remains.

When you run:

```bash
docker compose down -v
```

Compose-managed named volumes are removed, which can delete your database data.



## 8. Docker vs Docker Compose

| Docker | Docker Compose |
|---|---|
| Can run individual containers | Manages multiple services together |
| Uses commands such as `docker run` | Uses commands such as `docker compose up` |
| Container configuration can be passed through command options | Configuration is written in a YAML file |
| Useful for individual containers | Useful for multi-container applications |


---
