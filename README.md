# TaskFlow - MERN Task Management Application

TaskFlow is a production-ready MERN task management platform with secure JWT authentication, private task ownership, search, filters, sorting, pagination, dashboard statistics, responsive glassmorphism UI, dark mode, skeleton loading states, form validation, and toast feedback.

## Tech Stack

- Frontend: React, Vite, React Router, Context API, Axios, Tailwind CSS, React Hook Form, Zod, React Hot Toast, Lucide icons
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Helmet, CORS, rate limiting, mongo sanitization, Zod validation

## Project Structure

```text
taskmanager/
  backend/
    config/
      db.js
    controllers/
      authController.js
      taskController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
      validateRequest.js
    models/
      Task.js
      User.js
    routes/
      authRoutes.js
      taskRoutes.js
    utils/
      apiError.js
      asyncHandler.js
      generateToken.js
    validators/
      authValidators.js
      taskValidators.js
    .env.example
    app.js
    package.json
    server.js
  frontend/
    src/
      assets/
      components/
      context/
      hooks/
      layouts/
      pages/
      routes/
      services/
      utils/
    .env.example
    index.html
    package.json
    postcss.config.js
    tailwind.config.js
    vite.config.js
  .gitignore
  package.json
  README.md
```

## Local Setup

1. Install dependencies from the repository root:

```bash
npm run install:all
```

2. Create backend environment file:

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=300
```

3. Create frontend environment file:

```bash
cp frontend/.env.example frontend/.env
```

Update `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start MongoDB locally, then run both apps:

```bash
npm run dev
```

Frontend: `http://localhost:5173`  
Backend health check: `http://localhost:5000/api/health`

## API Endpoints

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

Register body:

```json
{
  "name": "Alex Morgan",
  "email": "alex@example.com",
  "password": "Password123"
}
```

Login body:

```json
{
  "email": "alex@example.com",
  "password": "Password123"
}
```

### Tasks

All task routes require `Authorization: Bearer <token>`.

```http
GET /api/tasks?search=&status=all&priority=all&sortBy=createdAt&sortOrder=desc&page=1&limit=9
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
PATCH /api/tasks/:id/status
```

Task body:

```json
{
  "title": "Prepare launch notes",
  "description": "Finalize release checklist and owner assignments.",
  "priority": "high",
  "status": "pending"
}
```

Status update body:

```json
{
  "status": "completed"
}
```

## Frontend Features

- Login and registration with Zod validation
- Password show/hide controls
- Persistent JWT session via local storage
- Protected routes
- Responsive dashboard layout
- Task creation and editing modal
- Search, status filter, priority filter, sorting, grid/list view
- Pagination
- Dashboard statistics
- Dark/light mode
- Loading skeletons, empty states, error states, toast notifications

## Backend Features

- Secure password hashing with bcrypt
- JWT authentication with expiration
- Protected task APIs scoped to the authenticated user
- Request validation with Zod
- Centralized async error handling
- Helmet security headers
- CORS allowlist
- Rate limiting
- Mongo query sanitization
- Mongoose timestamps and indexes

## Deployment

### Backend on Render or Railway

1. Create a new Node.js web service from this repository.
2. Set the root directory to `backend`.
3. Use `npm install` as the install command.
4. Use `npm run start` as the start command.
5. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=<your MongoDB Atlas connection string>`
   - `JWT_SECRET=<long random production secret>`
   - `JWT_EXPIRES_IN=7d`
   - `CLIENT_URL=<deployed frontend URL>`

### Frontend on Vercel or Netlify

1. Set the root directory to `frontend`.
2. Use `npm install` as the install command.
3. Use `npm run build` as the build command.
4. Use `dist` as the publish directory.
5. Add `VITE_API_URL=<deployed backend URL>/api`.

For Netlify single-page routing, add a redirect from `/*` to `/index.html` with status `200`.

## Sample Screenshots Description

- Login screen: glass panel authentication form, password visibility control, brand visual, light/dark toggle.
- Register screen: validated sign-up form with duplicate-email handling and responsive mobile layout.
- Dashboard screen: welcome header, theme toggle, logout, statistics cards, search and filters, grid/list controls.
- Task modal: add/edit form with title, description, priority, status, validation errors, and loading state.
- Empty state: centered action prompt when no tasks exist or filters return no results.

## Production Notes

- Use MongoDB Atlas for production data.
- Keep `.env` files out of source control.
- Rotate `JWT_SECRET` if it is ever exposed.
- Restrict `CLIENT_URL` to trusted origins in production.
- Serve the frontend over HTTPS before using production authentication.
