# TalkTrack Landing Page

TalkTrack is a light, cloud-inspired SaaS landing page with a separate Express
and MongoDB API for waitlist, contact, and data-export request storage.

## Project Structure

```text
frontend/  Vite React landing page, waitlist, policy, contact, and export pages
backend/   Express/Mongoose API plus Vercel serverless functions
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

Public support pages:

```text
/policies
/contact
/export-data
```

All landing page waitlist CTAs navigate to `/waitlist`. Footer utility links
point to the public policy, contact, and export request pages.

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

### POST `/api/contact`

Stores a support/contact request in MongoDB collection `contactRequests`.

Request body:

```json
{
  "name": "string optional",
  "email": "string",
  "appUserEmail": "string optional",
  "subject": "string",
  "message": "string",
  "company": "hidden honeypot optional"
}
```

Success response:

```json
{
  "ok": true,
  "message": "Your message has been received."
}
```

### POST `/api/export-data`

Stores a data-export task in MongoDB collection `exportDataRequests`.

Request body:

```json
{
  "name": "string optional",
  "accountEmail": "string",
  "confirmAccountEmail": "string",
  "message": "string optional",
  "ownershipVerificationAcknowledged": true,
  "company": "hidden honeypot optional"
}
```

Success response:

```json
{
  "ok": true,
  "message": "Your data export request has been received."
}
```

These public request forms only create review tasks. They do not authenticate
users, export data automatically, or email sensitive data.

## MongoDB Collections

Submitted tasks can be viewed in the database configured by `MONGODB_URI`:

```text
waitlistentries       Waitlist submissions
contactRequests       Contact/help/support requests
exportDataRequests    Data export requests
```

Contact/export documents include readable fields such as `type`, `status`,
`createdAt`, user-provided email fields, subject/message, and `userAgent`.

## Root Scripts

From the project root:

```bash
npm run dev:frontend
npm run lint:frontend
npm run build:frontend
npm run dev:backend
npm run start:backend
```
