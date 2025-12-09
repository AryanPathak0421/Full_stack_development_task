# RealEstate-Landing-Admin
Assignment: Landing page + Admin panel + Backend (Projects, Clients, Contacts, Subscribers)

## Tech
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React + Tailwind (optional)
- Image cropping: Sharp (server-side)

## Run locally
1. Backend
   - cd backend
   - cp .env.example .env
   - set MONGO_URI in .env
   - npm install
   - npm run start

2. Frontend
   - cd frontend
   - npm install
   - cp .env.example .env (set VITE_API_URL=http://localhost:5000)
   - npm run dev

## Deployment
- Backend: deploy to Heroku/Render/Railway
- Frontend: deploy to Vercel/Netlify
