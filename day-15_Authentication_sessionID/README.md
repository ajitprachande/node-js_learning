## simple in-memory user signup and token-based authentication system using Express.js.

## In-Memory Storage
- `DAIRY` stores user information using a generated token as the key.
- `EMAILS` is a `Set` used to make sure the same email cannot be registered twice.

# Signup: `POST /signup`
  - Receives `name`, `email`, and `password` from the request body.
  - Generates a token using `Date.now()`.
  - Stores the user inside DAIRY using that token.
  - Returns the generated token to the client.

# Get User: `GET /me/:id`
   - Takes the token from the URL parameter
   - Checks whether the token exists in DAIRY.
   - If valid, retrieves and returns the corresponding user's information.
   - If invalid, returns an "Invalid Token" error.

# View All Users: `GET /dairy`
- Returns the complete `DAIRY` object.