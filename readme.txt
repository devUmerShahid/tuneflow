# TuneFlow – Full-Stack Spotify Clone  

A beautiful, fully-functional music streaming web app built with the MERN stack + Redux + Tailwind.

## Features
- Real-time music search via Jamendo API
- Play, like, and create playlists
- Persistent login (httpOnly JWT cookies)
- Spotify-exact UI with mobile sidebar
- Liked Songs page, Search page, Library
- Responsive design (mobile + desktop)

## Tech Stack
**Frontend:** React 18, Vite, Redux Toolkit, Tailwind CSS, Lucide Icons  
**Backend:** Node.js, Express, MongoDB (Atlas), JWT auth  
**Deployment:** Vercel (frontend) + Render (backend)

## Live Demo
https://tuneflow-yourname.vercel.app

## Key Achievements
- Implemented secure cookie-based authentication with persistent sessions
- Built real-time search with external music API
- Designed pixel-perfect Spotify UI clone
- Full CRUD for playlists and likes
- Mobile-first responsive layout

## Setup (Local)
```bash
# Backend
cd server && npm install && npm run dev

# Frontend
cd client && npm install && npm run dev