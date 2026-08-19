## MVC Architecture in Node.js
## MVC = Model + View + Controller
---
                 Client
                   │
                   │ HTTP Request
                   ▼
                Routes
                   │
                   ▼
              Controller
              /        \
             ▼          ▼
          Model       Response
             │
             ▼
          Database
---

1. Model
- The Model is responsible for data and database-related operation
- In a real application, the Model would normally communicate with MongoDB, MySQL, PostgreSQL, etc.

2. View
- The View is responsible for what the user sees.

3. Controller
- The Controller contains the application/business logic.
- It receives the request, communicates with the Model, and sends the response.

4. Routes
- Routes aren't technically one of the three MVC components, but in an Express application they connect the request to the controller.

---
- MVC is a software architectural pattern that separates an application into Model, View, and Controller, where the `Model` handles data, the `View` handles presentation, and the `Controller` handles application logic and coordinates between them.
---


## Complete MVC Flow
---
GET /products
---

---
    Client
    │
    │ GET /products
    ▼
    Route
    │
    │ getProducts()
    ▼
    Controller
    │
    │ Get product data
    ▼
    Model
    │
    │ Database
    ▼
    Model
    │
    │ Data
    ▼
    Controller
    │
    │ res.json()
    ▼
    Client
---