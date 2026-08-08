# What is HTTP?

---

HTTP (HyperText Transfer Protocol) is a `stateless application-layer protocol` used for communication between clients and servers over a network. It is used to transfer resources such as HTML, JSON, images, videos, and files.

### Protocol

A `protocol` is a set of rules that both sides agree to follow when communicating with each other.

---

## HTTP is Stateless

HTTP is called `stateless` because each request a client makes to a server is independent of previous requests.

The server does not automatically remember information about previous requests.

In computer science, `state` generally means the information or memory maintained about previous interactions.

HTTP itself does not maintain this state between requests.

---

## Why is Statelessness Useful?

Statelessness provides several advantages:

* **Makes HTTP resilient:** If a request fails, the client can retry the request without the server needing to maintain the state of the previous request.

* **Reduces server-side state:** The server does not need to maintain the complete state of every client at the HTTP protocol level.

* **Helps distributed systems:** Multiple servers can handle requests independently, which makes techniques such as load balancing easier to implement.

---

## Client and Server

The `client` is an application or device that sends a request to a server to access a resource or service.

The `server` is an application or computer that receives the request, processes it, and sends an appropriate response back to the client.

Example:

```
      Client
        |
        | HTTP Request
        v
      Server
        |
        | HTTP Response
        v
      Client
```

---

## HTTP Request Contains

An HTTP request generally contains the following:

1. **Method** (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`)
   → It tells the server what action the client wants to perform.

   `GET` requests a representation of a resource from the server.
    `POST` submits data to the server, commonly to create a new resource or trigger processing. 
    - ("Create/process a new user using the data I'm sending.")

    `PUT` is generally used to completely replace the representation of a resource. ("Replace the resource.")
    `PATCH` is used to partially modify an existing resource.   ("Modify part of the resource.")
    `DELETE` requests that a resource be removed.
    `HEAD` is like GET, but the server returns the response headers without the response body.
    `OPTIONS` asks the server what communication options are available for a target resource.   
       - Allow: GET, POST, OPTIONS  : (This tells the client which methods are supported.)

2. **URL / Path**
   + It identifies the resource that the client wants to access.

3. **Headers**
   + They contain additional information about the request, such as content type, authorization, and client information.

4. **Body (Optional)**
   + It contains data sent from the client to the server, such as form data or JSON.

---

## HTTP Response Contains

An HTTP response generally contains the following:

1. **Status Code**
   + It tells the client the result of the request, such as whether it was successful or failed.

2. **Headers**
   + They provide additional information about the response, such as the content type or caching information.

3. **Body (Optional)**
   + It contains the actual data returned by the server, such as HTML, JSON, images, or other resources.

---

# HTTP Server Task (`httpTask.js`)

### Description

Build a simple HTTP server with the following features:

1. **GET `/`**
   + Send a simple "Hello from server" message to the client.

2. **GET `/contact-us`**
   + Send your email address and contact number to the client.

3. **POST `/tweet`**
   + Perform a fake database operation and send an acknowledgment that the operation is completed.

4. **GET `/tweet`**
   + Send all tweets from the fake database to the client.

5. **Request Logging**
   → Log all incoming requests with timestamps in a file named `log.txt`.

---

### Learnins:  
+ Understand why do we need HTTP.
+ HTTP communication flow
+ Request - Response lifecycle
+ what request contains? & what response contain?
+ Nodejs `http` module
+ creating log file
+ learned module `http`, `fs`, `path` with practical example
