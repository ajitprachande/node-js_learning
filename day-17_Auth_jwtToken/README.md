## token(jwt) based user authntication: User Signup, user login.

-   `pnpm` package manager.
-   user signup {name, email, password(Hashed Password),}
-   user login {email, password}  => token generation
-   user name and email update.
-   

## Entry point (index.js):
- Server listeing on PORT : http://localhost:8000

## Implemented Role based Access Control 
- Admin and User
- Only Admin can View all users.


### What is JWT?
- JWT (JSON Web Token) is a compact, signed token used to securely transfer information between a client and a server. 
- After successful authentication, the server generates a JWT containing user information (such as ID and role), signs it with a secret key, and 
- sends it to the client. On future requests, the client sends the token back, and the server verifies its signature to authenticate the user without requiring them to log in again.

```
    jwt.sign(
        { id: user._id, role: user.role }, // Payload (user information)
        "shhhhh",                          // Secret key (should come from .env)
        { expiresIn: "24h" }               // Token expires in 24 hours
    );
```

---
1. Payload = data that you want the JWT to carry.
2. jwt.sign():   
        takes the payload
        uses the secret/key to create the JWT signature
        adds expiration information
        returns the JWT token
3. Client sends JWT
        Authorization: Bearer <token>
4. jwt.verify()
    jwt.verify() checks:
        Is the signature valid?
        Was the token signed with the expected key?
        Is the token expired/otherwise invalid?
    If valid:
        JWT Token
            ↓
        jwt.verify()
            ↓
        Decoded Payload

---
