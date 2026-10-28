<!-- docker day-2 learning -->

1. First, understand why your browser cannot access the server
    ```  Your browser(host)
        http://localhost:3000
                |
        Docker port mapping
        Host port 3000 → Container port 3000
                |
        Your Node.js container
        Node.js server listening on port 3000
    ```

## There are three separate things to understand:
- `Server`: Your Node.js application must actually start.
- `Listening port`: Your application must listen on the appropriate port and network interface.
- `Port mapping`: Docker must forward traffic from a port on your computer to a port inside the container.

## 2. What is port mapping?
Port mapping connects a port on your computer (the host) to a port inside the Docker container.
```bash
docker run -p 3000:3000 my-node-app
```
Part	       | Meaning
-------------------------------------------------------------------
First 3000	   | Port on your computer
Second 3000	   | Port inside the container
-p	           |Publishes/maps the container port to the host

---

## automatic port mapping:

    ```bash
        docker run -itd --name my-cont -P --rm my-image 
    ```
- `-i`: Keeps standard input open
- `-t`: Allocates pseduo terminal
- `-d`: Runs the container in the background and return container ID
- `-P`: publish app exposed port inside Dockerfile and automatically assign host port.
- `--rm`: Automaticlly remove container after it stop.

