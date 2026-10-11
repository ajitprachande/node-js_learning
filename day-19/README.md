# Day 19 - URL Shortener REST API with Authentication & Zod Validation

A modern, production-structured URL Shortener REST API built with **Node.js**, **Express 5**, **PostgreSQL**, **Drizzle ORM**, **Zod**, and **Docker**.

---

## 📌 Project Overview

This project implements a secure URL shortener service following a clean layered architecture (Controllers, Services, Models, Routes, Middlewares, and Validators). It supports custom alias or auto-generated short URLs, JWT authentication, password hashing with per-user cryptographic salts, and strict schema validation using Zod.

---

## Features

- **User Authentication & Authorization**:
  - User registration (`/signup`) & login (`/login`) with JWT token issuance.
  - Custom cryptographic password hashing using HMAC SHA-256 + 32-byte random salts.
  - Profile retrieval & secure password update with old password verification.
  - Global token extraction middleware + protected route guards (`ensureAuthenticated`).
- **URL Shortening**:
  - Shorten long URLs with optional custom alias/shortCode.
  - Auto-generated shortcodes using `nanoid` (7 characters).
  - Redirection from short code to destination URL (`302 Redirect`).
  - List all URLs created by the authenticated user.
  - Delete short URL by ID (user-isolated protection).
- **Request & Schema Validation**:
  - Zod schemas validating request bodies for signup, login, URL shortening, and JWT token payloads.
- **Database & ORM**:
  - PostgreSQL 17 powered by Docker Compose.
  - Schema definition and migrations via **Drizzle ORM** & **Drizzle Kit**.
  - Drizzle Studio integration for database GUI inspection.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** (ES Modules) | Runtime Environment |
| **Express 5** | Web Framework |
| **PostgreSQL 17** | Relational Database |
| **Docker Compose** | Containerized Database Management |
| **Drizzle ORM / Drizzle Kit** | Type-safe ORM & Database Migration Toolkit |
| **Zod (v4)** | Request & Payload Schema Validation |
| **JWT (`jsonwebtoken`)** | Token-based Stateless Authentication |
| **Node.js `crypto`** | Salt generation (`randomBytes`) & HMAC SHA-256 Hashing |
| **Nanoid** | Collision-resistant Short Code Generation |
| **Nodemon** | Hot-reloading Development Server |

---

## 📁 Project Architecture & Structure

```
day-19/
├── controller/
│   ├── url.controller.js        # URL route request handlers & HTTP responses
│   └── user.controller.js       # User signup, login, profile, password update handlers
├── db/
│   └── index.js                 # PostgreSQL Drizzle client initialization
├── drizzle/                     # Drizzle migration artifacts & meta files
├── middleware/
│   └── auth.middleware.js       # JWT extraction & ensureAuthenticated route guard
├── models/
│   ├── index.js                 # Schema barrel export
│   ├── url.model.js             # 'urls' table schema definition (UUID, shortCode, targetUrl, userId)
│   └── user.model.js            # 'users' table schema definition (UUID, email, salt, password)
├── routes/
│   ├── url.routes.js            # /url route declarations
│   └── user.routes.js           # /user route declarations
├── services/
│   ├── url.service.js           # Database queries and business logic for URLs
│   └── user.service.js          # Database queries and business logic for Users
├── utils/
│   ├── jwtToken.js              # Token signing & validation helper
│   └── passwordHash.js          # Salt generation & HMAC SHA-256 hashing helper
├── validations/
│   ├── jwtToken.validation.js   # Zod schema for JWT payload
│   └── request.validation.js    # Zod schemas for signup, login, and URL shortening requests
├── .env                         # Environment variables (port, db URL, jwt secret)
├── .gitignore                   # Ignored files (node_modules, .env)
├── docker-compose.yml           # Postgres 17 service definition
├── drizzle.config.js            # Drizzle Kit configuration
├── index.js                     # Main application entry point
├── package.json                 # Scripts and dependencies
└── README.md                    # Project documentation
```

---

## 🗄️ Database Schema

### `users` Table
| Column | Type | Constraints / Details |
|---|---|---|
| `id` | `UUID` | Primary Key, default random |
| `first_name` | `VARCHAR(55)` | Not Null |
| `last_name` | `VARCHAR(55)` | Nullable |
| `email` | `VARCHAR(255)` | Unique, Not Null |
| `Hashed_password` | `TEXT` | HMAC SHA-256 hashed password, Not Null |
| `salt` | `TEXT` | Hex-encoded 32-byte salt, Not Null |
| `created_at` | `TIMESTAMP` | Default current timestamp, Not Null |
| `updated_at` | `TIMESTAMP` | Updated timestamp on change |

### `urls` Table
| Column | Type | Constraints / Details |
|---|---|---|
| `id` | `UUID` | Primary Key, default random |
| `code` | `VARCHAR(155)` | Short code, Unique, Not Null |
| `targetUrl` | `TEXT` | Original destination URL, Not Null |
| `user_id` | `UUID` | Foreign Key (`users.id`), Not Null |
| `created_at` | `TIMESTAMP` | Default current timestamp, Not Null |
| `updated_at` | `TIMESTAMP` | Updated timestamp on change |

---

## 🛡️ Security & Validation Highlights

1. **Password Salt & Hashing**:
   - Rather than storing raw passwords or plain hashes, each user is generated a cryptographically random 32-byte hexadecimal salt (`randomBytes(32)`).
   - Password is encrypted via `crypto.createHmac('sha256', salt)`.
2. **Strict Zod Validations**:
   - Email format validation, password length limits (4 to 15 characters), and URL validity check (`z.string().url()`).
   - Token payload structure validation (`userTokenSchema`) before issuance.
3. **Database Security & Ownership Isolation**:
   - Short URL deletion verifies both `urlsTable.id` and `urlsTable.userId` ensuring users cannot delete another user's shortened URLs.

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/) & Docker Compose

### 2. Environment Setup
Create a `.env` file in the root directory (or use the existing one):

```env
PORT=8000
DATABASE_URL=postgres://postgresuser:admin@localhost:5432/postgresdb
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Start Database
Spin up the PostgreSQL database container with Docker Compose:

```bash
docker compose up -d
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Synchronize Database Schema
Push the Drizzle schemas into your PostgreSQL database:

```bash
npm run db:push
```

*(Optional)* Launch Drizzle Studio to view database tables in your browser:
```bash
npm run db:studio
```

### 6. Start the Server
Start development server with nodemon:

```bash
npm run dev
```

The server will be running at `http://localhost:8000`.
---
