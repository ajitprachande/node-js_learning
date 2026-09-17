## in this folder: overall flow and architecture of this Express.js application, which implements a session-based authentication system
## creating end-to-end authentication (session based auth).
---
-   `pnpm` package manager. 
1. Entry Point `(index.js)`
- application starts by initializing express server.
- loads env variables like `PORT` using 'dotenv'
  
2. Routing `(routes/user.routes.js)`

-This file defines four main API endpoints:

`POST /signup`:  route to register a new user.
`POST /login`:  route to authenticate a user and generate a session.
`GET /profile`: Protected route (uses isLoggedin middleware) to fetch user details.
`PATCH /profile`: Protected route to update the user's name. 

3. Controllers `(controllers/user.controller.js)`
Contains the core business logic for the routes:
   
`signup`: 
- Validates input, checks if the email is already registered,
- generates a random salt, hashes the user's password using crypto (createHmac + sha256), and saves the new user to the database.

`login`: 
- Looks up the user by email, retrieves their stored salt and password (hash). 
- It hashes the incoming password attempt with the stored salt and compares it. 
- If they match, a session is created in the database, and the sessionId is returned to the client.
  
`profile`: 
- Simply returns the req.user object which was attached by the authentication middleware.

`UpdateName`: Takes the new name from the request body and updates the user's record in the database using the user ID from the authenticated session.


4. Authentication Middleware `(middleware/user.sessionAuth.js)`
- `isLoggedin`: Extracts the session-id from the HTTP headers.
- If a session ID is present, it performs a database query (joining the `userSessions` table with the `userTable`) to verify the session is valid and to fetch the user's information.


5. Database & ORM `(db/index.js & db/schema.js)`
- The app uses Drizzle ORM configured for PostgreSQL.
- `index.js` establishes the database connection.
- `schema.js`defines the structure of the data
- `userTable`: Stores user credentials (id, name, email, password, salt).
- `userSessions`: A table specifically for managing active sessions. 

---
### What is a Docker volume?**
- Persistent storage managed by Docker that allows data to survive beyond the lifetime of a container.
- Think of it like an `external hard disk` for your container.
    ```EX:
            volumes:
            - db_data:/var/lib/postgresql/db_data
        volumes:
            db_data:
    ```
        db_data =>                      Docker volume
        - /var/lib/postgresql/db_data => Location INSIDE the container
- It means:
    **Mount the Docker volume named db_data at /var/lib/postgresql/db_data inside this container.**
    **Docker, please create/manage a volume named db_data.**
---

### Session-Based Authentication
Session-based authentication is an authentication method where the server creates a session for the user after successful login and uses a session ID to recognize that user in future requests.

## Advantages of Session-Based Authentication
- `Easy to implement`: Session-based authentication is relatively simple to understand and implement, especially in traditional web applications.

- `Easy logout`: The server can invalidate or delete the session, which immediately logs the user out.

- `Server-side control`: Since the session is stored on the server, the server can control, modify, or revoke a user's session whenever required.

- `Better control over sensitive data`: Important session information can remain on the server instead of being stored directly in the client.

- `Suitable for web applications`: It works well for applications where users interact with a browser and a backend server.

## Disadvantages of Session-Based Authentication
- `Requires server-side storage`: The server must store session information in a database, cache, or other storage system.

- `More server work`: The server generally needs to look up the session for authenticated requests, which adds additional work.

- `Scaling can be more complex`: When an application runs on multiple servers, those servers need access to shared session storage or another session-management strategy.

- `Session hijacking risk`: If an attacker obtains a valid session ID, they may be able to act as the authenticated user.

- `Requires proper session management`: Developers need to properly handle session expiration, cookies, logout, and session invalidation to maintain security.

