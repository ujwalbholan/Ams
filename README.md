# AMS — API & Request Docs

This repository contains a NestJS backend and a Next.js frontend for an Artist/Music management app (AMS).

## Run (backend)
1. Copy `.env.exampl` -> `.env` and set values.
2. Install & start:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
3. Default server: `http://localhost:3000`

## Authentication
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Successful login returns access (and refresh) tokens.
- Protected endpoints expect: `Authorization: Bearer <ACCESS_TOKEN>`

### Example: Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

## artist
- create: `POST /auth/register`
- Login: `POST /auth/login`
- Successful login returns access (and refresh) tokens.
- Protected endpoints expect: `Authorization: Bearer <ACCESS_TOKEN>`

### Example: Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```

## Authentication
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Successful login returns access (and refresh) tokens.
- Protected endpoints expect: `Authorization: Bearer <ACCESS_TOKEN>`

### Example: Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"secret"}'
```


