# Uber Clone

## Project Description

This project is a full‑stack Uber‑like ride hailing application with separate Backend and Frontend apps. It supports real‑time ride flow via sockets, user and captain authentication, ride request/confirmation, and live location tracking on Google Maps.

## Tech Stack

- Frontend: React (Vite), Tailwind CSS, Socket.IO client, Google Maps JS API
- Backend: Node.js, Express, MongoDB, Socket.IO

## Local Setup

### 1) Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or Atlas)
- Google Maps API key with Maps JavaScript API enabled

### 2) Clone & Install

```bash
git clone <your-repo-url>
cd Uber clone

# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 3) Environment Variables

Create the following `.env` files:

**Backend/.env**

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=4000
```

**Frontend/.env**

```
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 4) Run the Apps

**Backend**

```bash
cd Backend
npm run dev
```

**Frontend**

```bash
cd Frontend
npm run dev
```

Open http://localhost:5173 in your browser.

## Notes

- Ensure the Maps JavaScript API is enabled for your Google Cloud project.
- Allow location permissions in the browser for live tracking.
