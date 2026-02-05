# Frontend

## Features

- User and captain authentication flows
- Ride request creation with pickup/destination suggestions
- Real‑time ride status updates via Socket.IO
- Live location tracking using Google Maps
- Animated UI panels for ride steps (vehicle selection, confirmation, waiting, riding)
- Captain dashboard with ride accept/confirm and ride completion flow

## Tech

- React + Vite
- Tailwind CSS
- Socket.IO client
- @react-google-maps/api

## Setup

```bash
npm install
npm run dev
```

Create `.env`:

```
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```
