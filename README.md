# TalkTrack Landing Page

TalkTrack is a dark premium SaaS landing page with a separate waitlist API.

## Project Structure

```text
frontend/  Vite React landing page and waitlist screen
backend/   Express and Mongoose waitlist API
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The Vite app runs at:

```text
http://localhost:5173
```

Create `frontend/.env` from `frontend/.env.example`:

```text
VITE_API_URL=http://localhost:5001
```

The waitlist screen is available at:

```text
/waitlist
```

All landing page waitlist CTAs navigate to `/waitlist`.

## Backend

```bash
cd backend
npm install
npm run dev
```

Create `backend/.env` from `backend/.env.example`:

```text
PORT=5001
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
```

Do not commit a real MongoDB URI.

Note: macOS may reserve port `5000` for Control Center/AirPlay Receiver. TalkTrack uses `5001` by default to avoid that conflict.

## API

### POST `/api/waitlist`

Request body:

```json
{
  "name": "string",
  "contact": "string",
  "honestPrice": "string",
  "suggestions": "string optional"
}
```

Success response:

```json
{
  "success": true,
  "message": "You are on the waitlist."
}
```

### GET `/api/waitlist/count`

Response:

```json
{
  "success": true,
  "count": 0
}
```

## Root Scripts

From the project root:

```bash
npm run dev:frontend
npm run lint:frontend
npm run build:frontend
npm run dev:backend
npm run start:backend
```
