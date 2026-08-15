## What is Middleware?
---
    Middleware is a function that runs between receiving an HTTP request and sending the final response.
    Middleware Can Modify the Request
    Middleware Can Stop a Request
---

## Basic Middleware Structure
--- 
    (req, res, next) => {
        // middleware logic

        next();
    }
---
`req`     The incoming HTTP request. <br>
`res`     The response that you'll eventually send to the client. <br>
`next`    means: "I'm finished with my middleware work. Continue to the next middleware or route handler."

## What Happens If We Don't Call next()?
+ The request is not passed to the next handler.
+ The browser may keep waiting because no response was sent.

## What is Global Middleware?
---
Global middleware is middleware that is registered at the application level and
can run for `every incoming request`, unless its execution is otherwise restricted or it `ends the request`.
---

## Route-Level Middleware
---
Now suppose you don't want middleware to run for every route. <br>
You want it only for specific routes. <br>
That's where route-level middleware comes in.
---