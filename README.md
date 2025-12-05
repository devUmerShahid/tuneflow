TuneFlow - Music Straeming App

Live Demo → https://tuneflow-lime.vercel.app
Backend API → https://tuneflow-aa8u.onrender.com

A full-featured, production-ready music streaming web app that closely replicates Spotify’s core experience — built as a portfolio showcase with modern tools and best practices.

Features

◘ Real-time music discovery via Jamendo API (royalty-free tracks)
◘ Secure authentication using httpOnly JWT cookies with persistent sessions
◘ Full playlist management – create, add/remove songs, view details
◘ Like system – instant toggle with visual feedback
◘ Dedicated pages – Home • Browse • Search • Liked Songs • Library • Playlist Detail
◘ Global responsive sidebar (mobile collapsible, desktop fixed)
◘ Pagination for songs loading on Home 
◘ Mini player with play/pause controls
◘ Pixel-perfect Spotify 2025 UI built with Tailwind CSS and Lucide icons
◘ Fully responsive – mobile, tablet, desktop
◘ Client-side routing with React Router v6
◘ Toast notifications for user actions

Tech Stack
    Frontend - React 18 + Vite, Redux Toolkit, React Router v6, Tailwind CSS, Lucide Icons
    Backend - Node.js, Express, MongoDB (Atlas), Mongoose
    Auth - httpOnly JWT cookies
    Music API - Jamendo (royalty-free streaming)
    Deployment - Vercel (frontend) • Render (backend)

Local Development:
Clone the repo
    -git clone https://github.com/devUmerShahid/tuneflow.git
    -cd tuneflow

    Backend
    -cd server
    -npm install
    -npm run dev

    Frontend (new terminal)
    -cd ../client
    -npm install
    -npm run dev

Environment Variables

    Backend (server/.env)
    -envPORT=5000
    -MONGO_URI=your_mongodb_uri
    =JWT_SECRET=your_strong_secret
    -JAMENDO_CLIENT_ID=your_jamendo_client_id

    Frontend (client/.env)
    -envVITE_API_URL=http://localhost:5000/api