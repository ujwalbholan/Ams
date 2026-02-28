# AMS — Artist Management System

## Overview
AMS is a full-stack application for managing artists, their albums, and related information.  
The project follows **modern coding best practices**, including reusable components, separation of concerns, and secure token-based routing.  
It also includes a simple **CI/CD pipeline** for automated builds and deployments.

---

## Features

- **Artist Management**: Add, edit, delete, and view artist details.  
- **Protected Routes**: Token-based authentication for secure access.  
- **Reusable Components**: Frontend built with modular components for easy scalability.  
- **Backend API**: RESTful API for managing artist data with proper CRUD operations.  
- **Pagination**: Efficient backend pagination for handling large datasets.  
- **Simple CI/CD**: Automated build and deployment pipeline.  
- **Error Handling & Notifications**: Clear feedback using toast messages.

---

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, TailwindCSS  
- **Backend**: Node.js,Nest js, TypeScript  
- **Database**: PostgreSQL(Neon Db- Cloud) (replace with your database)  
- **Authentication**: JWT-based token authentication  
- **CI/CD**: GitHub Actions / Vercel Deployment(frontend) / Render(fro backend)

---

The frontend is hosted in Vercel. The project link: [AMS](https://ams-ashen.vercel.app/)

you can colne and run the project locally it will work.

# frontend
The frontend for the AMS is build on next js

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ujwalbholan/Ams.git
   cd ams
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   NEXT_PUBLIC_API_URL='http://localhost:3000'
   ```

4. **Start the server:**
   ```bash
   npm run start | npm run dev
   ```

   The Frontend will be available at `http://localhost:3000`.

---

# Backend

A RESTful API for managing artists and their music. AMS provides endpoints for user authentication and music catalog operations.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Base URL](#base-url)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
    - [Register](#register)
    - [Login](#login)
  - [Artist](#artist)
    - [Create Artist](#create-artist)
    - [Get All Artists](#get-all-artists)
    - [Get Artist by ID](#get-artist-by-id)
    - [Update Artist](#update-artist)
    - [Delete Artist](#delete-artist)
  - [Music](#music)
    - [Create Music](#create-music)
    - [Get All Music](#get-all-music)
    - [Find Music by ID](#find-music-by-id)
    - [Update Music](#update-music)
    - [Delete Music](#delete-music)

---

## Getting Started

Follow the steps below to get the AMS API running locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Postman](https://www.postman.com/) (optional, for testing endpoints)
- [neondb](https://neon.com/) i have used cloud neon db as database(PostgreSQL)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ujwalbholan/Ams.git
   cd ams
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:
   ```env
   PORT=3001
   DATABASE_URL=your_database_connection_string
   JWT_ACCESS_SECRET=your_jwt_secret_key
   JWT_REFRESH_SECRET=your_jwt_refresh_key
   ```

5. **Start the server:**
   ```bash
   nest start --watch
   ```

   The API will be available at `http://localhost:3001`.

---

## Base URL

```
http://localhost:3001
```

---

## Authentication

AMS uses **JWT (JSON Web Token)** based authentication. After a successful login, you will receive a token that must be included in the `Authorization` header for protected routes.

```
Authorization: Bearer <your_token>
```

---

## API Endpoints

### Auth

#### Register

Creates a new user account.

| Property    | Value                  |
|-------------|------------------------|
| **Method**  | `POST`                 |
| **URL**     | `/auth/register`       |
| **Auth**    | Not required           |

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Response — `201 Created`:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com"
  }
}
```

---

#### Login

Authenticates a user and returns a JWT token.

| Property    | Value                  |
|-------------|------------------------|
| **Method**  | `POST`                 |
| **URL**     | `/auth/login`          |
| **Auth**    | Not required           |

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securePassword123"
}
```

**Response — `200 OK`:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Artist

#### Create Artist

Creates a new artist profile.

| Property    | Value                  |
|-------------|------------------------|
| **Method**  | `POST`                 |
| **URL**     | `/artist`              |
| **Auth**    | Bearer Token required  |

**Request Body:**
```json
{
  "name": "John Doe",
  "genre": "Pop",
  "bio": "An award-winning pop artist from New York.",
  "country": "USA"
}
```

**Response — `201 Created`:**
```json
{
  "message": "Artist created successfully",
  "artist": {
    "id": 42,
    "name": "John Doe",
    "genre": "Pop",
    "bio": "An award-winning pop artist from New York.",
    "country": "USA"
  }
}
```

---

#### Get All Artists

Returns a paginated list of all artists.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `GET`                        |
| **URL**     | `/artist`                    |
| **Auth**    | Bearer Token required        |

**Query Parameters:**

| Parameter | Type    | Required | Description                        |
|-----------|---------|----------|------------------------------------|
| `page`    | integer | No       | Page number (default: `1`)         |
| `limit`   | integer | No       | Number of results per page (default: `5`) |

**Example Request:**
```
GET /artist?page=1&limit=5
```

**Response — `200 OK`:**
```json
{
  "total": 50,
  "page": 1,
  "limit": 5,
  "artists": [
    {
      "id": 1,
      "name": "John Doe",
      "genre": "Pop",
      "country": "USA"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "genre": "Jazz",
      "country": "UK"
    }
  ]
}
```

---

#### Get Artist by ID

Retrieves a single artist by their ID.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `GET`                        |
| **URL**     | `/artist/:id`                |
| **Auth**    | Bearer Token required        |

**Path Parameters:**

| Parameter | Type    | Required | Description     |
|-----------|---------|----------|-----------------|
| `id`      | integer | Yes      | The artist's ID |

**Example Request:**
```
GET /artist/42
```

**Response — `200 OK`:**
```json
{
  "id": 42,
  "name": "John Doe",
  "genre": "Pop",
  "bio": "An award-winning pop artist from New York.",
  "country": "USA"
}
```

---

#### Update Artist

Updates an existing artist's information.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `PUT`                        |
| **URL**     | `/artist/:id`                |
| **Auth**    | Bearer Token required        |

**Path Parameters:**

| Parameter | Type    | Required | Description     |
|-----------|---------|----------|-----------------|
| `id`      | integer | Yes      | The artist's ID |

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "genre": "R&B",
  "bio": "Updated bio for John Doe.",
  "country": "Canada"
}
```

**Response — `200 OK`:**
```json
{
  "message": "Artist updated successfully",
  "artist": {
    "id": 42,
    "name": "John Doe Updated",
    "genre": "R&B",
    "bio": "Updated bio for John Doe.",
    "country": "Canada"
  }
}
```

---

#### Delete Artist

Deletes an artist by their ID.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `DELETE`                     |
| **URL**     | `/artist/:id`                |
| **Auth**    | Bearer Token required        |

**Path Parameters:**

| Parameter | Type    | Required | Description     |
|-----------|---------|----------|-----------------|
| `id`      | integer | Yes      | The artist's ID |

**Example Request:**
```
DELETE /artist/81
```

**Response — `200 OK`:**
```json
{
  "message": "Artist deleted successfully"
}
```

---

### Music

#### Create Music

Adds a new music record to the catalog.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `POST`                       |
| **URL**     | `/music`                     |
| **Auth**    | Bearer Token required        |

**Request Body:**
```json
{
  "title": "Summer Vibes",
  "artistId": 42,
  "album": "Sunshine Collection",
  "genre": "Pop",
  "duration": 210,
  "releaseYear": 2024
}
```

**Response — `201 Created`:**
```json
{
  "message": "Music created successfully",
  "music": {
    "id": 61,
    "title": "Summer Vibes",
    "artistId": 42,
    "album": "Sunshine Collection",
    "genre": "Pop",
    "duration": 210,
    "releaseYear": 2024
  }
}
```

---

#### Get All Music

Returns a paginated list of all music records.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `GET`                        |
| **URL**     | `/music`                     |
| **Auth**    | Bearer Token required        |

**Query Parameters:**

| Parameter | Type    | Required | Description                         |
|-----------|---------|----------|-------------------------------------|
| `page`    | integer | No       | Page number (default: `1`)          |
| `limit`   | integer | No       | Number of results per page (default: `10`) |

**Example Request:**
```
GET /music?page=1&limit=10
```

**Response — `200 OK`:**
```json
{
  "total": 120,
  "page": 1,
  "limit": 10,
  "music": [
    {
      "id": 61,
      "title": "Summer Vibes",
      "artistId": 42,
      "genre": "Pop",
      "releaseYear": 2024
    }
  ]
}
```

---

#### Find Music by ID

Retrieves a single music record by its ID.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `GET`                        |
| **URL**     | `/music`                     |
| **Auth**    | Bearer Token required        |

**Query Parameters:**

| Parameter | Type    | Required | Description    |
|-----------|---------|----------|----------------|
| `id`      | integer | Yes      | The music's ID |

**Example Request:**
```
GET /music?id=61
```

**Response — `200 OK`:**
```json
{
  "id": 61,
  "title": "Summer Vibes",
  "artistId": 42,
  "album": "Sunshine Collection",
  "genre": "Pop",
  "duration": 210,
  "releaseYear": 2024
}
```

---

#### Update Music

Updates an existing music record.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `PUT`                        |
| **URL**     | `/music/:id`                 |
| **Auth**    | Bearer Token required        |

**Path Parameters:**

| Parameter | Type    | Required | Description    |
|-----------|---------|----------|----------------|
| `id`      | integer | Yes      | The music's ID |

**Request Body:**
```json
{
  "title": "Summer Vibes (Remix)",
  "album": "Sunshine Collection Deluxe",
  "genre": "Dance Pop",
  "duration": 225
}
```

**Response — `200 OK`:**
```json
{
  "message": "Music updated successfully",
  "music": {
    "id": 61,
    "title": "Summer Vibes (Remix)",
    "album": "Sunshine Collection Deluxe",
    "genre": "Dance Pop",
    "duration": 225,
    "releaseYear": 2024
  }
}
```

---

#### Delete Music

Deletes a music record by its ID.

| Property    | Value                        |
|-------------|------------------------------|
| **Method**  | `DELETE`                     |
| **URL**     | `/music/:id`                 |
| **Auth**    | Bearer Token required        |

**Path Parameters:**

| Parameter | Type    | Required | Description    |
|-----------|---------|----------|----------------|
| `id`      | integer | Yes      | The music's ID |

**Example Request:**
```
DELETE /music/61
```

**Response — `200 OK`:**
```json
{
  "message": "Music deleted successfully"
}
```

---

## Error Handling

The API uses standard HTTP status codes to indicate the outcome of requests.

| Status Code | Meaning               | Description                                                  |
|-------------|-----------------------|--------------------------------------------------------------|
| `200`       | OK                    | Request was successful.                                      |
| `201`       | Created               | Resource was successfully created.                           |
| `400`       | Bad Request           | The request was malformed or missing required fields.        |
| `401`       | Unauthorized          | Authentication token is missing or invalid.                  |
| `403`       | Forbidden             | You do not have permission to access this resource.          |
| `404`       | Not Found             | The requested resource does not exist.                       |
| `409`       | Conflict              | A resource with the same unique identifier already exists.   |
| `500`       | Internal Server Error | An unexpected error occurred on the server.                  |

**Error Response Format:**
```json
{
  "statusCode": 404,
  "message": "Artist not found",
  "error": "Not Found"
}
```

---

## Contributing

Contributions are welcome! Please follow the steps below:

1. **Fork** the repository.
2. **Create** a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes with a clear message:
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch and describe your changes.

### Code Style

- Follow existing naming conventions and folder structure.
- Write clear, descriptive commit messages using [Conventional Commits](https://www.conventionalcommits.org/).
- Ensure all endpoints are tested before submitting a PR.

---

> **Note:** This API is intended for local development. For production deployments, ensure proper environment configuration, HTTPS, and security hardening.

> **Note** The dashboard content is dummy content. Rest Artist and Muic creation is fully working