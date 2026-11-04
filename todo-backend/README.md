# Todo Backend API

This is production-ready todo application build using MERN Stack ( MongoDB, ExpressJS, ReactJS, NodeJS). This project demonstrate authentication, authorization, secure session management, REST APIs and scaleable project architecture.

## Features

- User Authentication
- JWT Authentication
- RefreshToken Rotation
- REST APIs
- Todo CRUD operations
- Protected Routes
- Input Validation
- File upload
- Error Handling
- Logging
- And many more...

## Tech stack

- NodeJs For Runtime
- Express For Webframework
- Typescript For Type Safety
- MongoDb For Database
- Mongoose For ODM
- JWT For Authentication
- Bcrypt For Password Hashing

## Folder structure

src/
|-- config # Application Configuration

## Requirements

- Node.js 20.19 or newer
- MongoDB running locally, or a MongoDB connection string

## Installation

```bash
npm install
```

```bash
copy .env.example .env
```

Edit `.env` and replace both token-secret placeholders with different random
values before starting the server. Keep `.env` private and use separate secrets
in production.

```bash
npm run dev
```

## Environment Variables

- `PORT` — API port (3001 by default)
- `MONGODB_URI` — MongoDB connection string
- `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET` — different random signing secrets
- `ACCESS_TOKEN_EXPIRY` / `REFRESH_TOKEN_EXPIRY` — token lifetimes (for example `15m` and `7d`)
- `FRONTEND_URL` — allowed frontend origin (defaults to `http://localhost:3000`)
- `NODE_ENV` — set to `production` when deployed

For a production build, run `npm run build` followed by `npm start`.

## API

The API base URL is `http://localhost:3001/api/v1`.

- `POST /auth/register` and `POST /auth/login` accept JSON credentials.
- `POST /auth/refresh` returns a new access token using the refresh cookie.
- `GET /todo/get-todos` requires a bearer access token and supports `completed`
  (`true` or `false`), `page`, `limit` (capped at 100), `sort`, `order`, and
  `priority` query parameters.
- `POST /todo/create-todo`, `PATCH /todo/:todoId`, and
  `DELETE /todo/:todoId` require a bearer access token.

Todo creation requires `title`; `description` and `dueDate` are optional.
`priority` can be `LOW`, `MEDIUM`, or `HIGH` and defaults to `MEDIUM`.
