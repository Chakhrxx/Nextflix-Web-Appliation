# 🎬 Netflix Clone Web Application

A modern, full-stack **Netflix-inspired streaming platform clone** with responsive UI, authentication, genre-based browsing, and movie detail pages. Built using Next.js App Router and NestJS for scalable frontend-backend separation.

## 🧱 Tech Stack

- **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/) + TailwindCSS + SwiperJS
- **Backend**: [NestJS](https://nestjs.com/) (API) deployed via Firebase Cloud Functions
- **Database/API**: [IMDb RapidAPI](https://rapidapi.com/) used as external data provider
- **Authentication**: Firebase Auth (Google Sign-In)
- **Deployment**:
  - Frontend: [Vercel](https://vercel.com/)
  - Backend: [Firebase Functions](https://firebase.google.com/)

## 🚀 Live Demo

- **Frontend**:  
  🌐 [nextflix-web-appliation-three.vercel.app](https://nextflix-web-appliation-three.vercel.app/)

- **Backend API Endpoint** (served via Firebase Cloud Functions):  
  🔗 [`https://asia-southeast1-netflix-a80a3.cloudfunctions.net/api`](https://asia-southeast1-netflix-a80a3.cloudfunctions.net/api)

## 📦 Installation

### Clone the Project

```bash
git clone https://github.com/Chakhrxx/Nextflix-Web-Appliation.git

cd Nextflix-Web-Appliation
```

## ⚛️ Setup the Frontend (client)

```bash
cd client
bun install
```

Create `.env.local` in `client/:`

```bash
NEXT_PUBLIC_API_URL=https://asia-southeast1-netflix-a80a3.cloudfunctions.net/api
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDbf-VjP4CWyO8PO6byWTSOB_tI6u6dBuc
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=netflix-a80a3.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=netflix-a80a3
NEXT_PUBLIC_FIREBASE_APP_ID=1:915630896048:web:7b82295f4c3abc89ac1c75
```

## Features handled by frontend:

- Built-in routing with dynamic [slug] and [id] support

- Client-side data fetching (SSR optional)

- Fully responsive and mobile-friendly

- Lazy-loaded <Image /> for performance

- Firebase Auth Google login

- Carousel sliders (SwiperJS)

- Genre-based content filtering

## 🛠️ Setup the Backend (NestJS via Firebase Functions)

```bash
cd functions
bun install
```

Create `.env` in `functions/:`

```bash
RAPIDAPI_KEY=cbf5866b79msh5a2c063ac0824c2p1b6ad3jsnfe34d2eb6f36
RAPIDAPI_HOST=imdb236.p.rapidapi.com
RAPIDAPI_BASE_URL=https://imdb236.p.rapidapi.com
```

# 📘 API Endpoints (via Firebase Functions)

All API routes are served under:

- Base URL: https://asia-southeast1-netflix-a80a3.cloudfunctions.net/api/movies

## 🎯 Movie & TV Endpoints

| Method | Route                 | Description                                 |
| ------ | --------------------- | ------------------------------------------- |
| GET    | `/most-popular-tv`    | Get the most popular TV shows               |
| GET    | `/top250-tv`          | Get the top 250 rated TV shows              |
| GET    | `/most-popular-movie` | Get the most popular movies                 |
| GET    | `/top250-movie`       | Get the top 250 rated movies                |
| GET    | `/upcoming-releases`  | Get upcoming movie releases by country/type |
| GET    | `/genres`             | Get available movie genres                  |
| GET    | `/countries`          | Get countries with available content        |
| GET    | `/search`             | Search by type/genre/keyword                |
| GET    | `/title/:id`          | Get detailed info for a specific title      |

## Run Locally

```bash
# Start backend
cd functions
bun run start:dev

# Start frontend
cd ../client
bun run dev
```

## 🧠 App Pages Overview

| Route                       | Description                                   |
| --------------------------- | --------------------------------------------- |
| `/`                         | Upcoming movie releases                       |
| `/tv-show`                  | Most popular TV shows                         |
| `/movies`                   | Most popular movies                           |
| `/new-and-popular`          | Top-rated movies + shows combined             |
| `/movies/categories/[slug]` | Filter content by genre (Action, Drama, etc.) |
| `/movies/[id]`              | Movie detail page with rating + trailer       |

Trailer Preview

## 🧩 Components

- Navbar with dropdown, profile pic, dynamic route highlighting

- Swiper Carousel for horizontal scrolling lists

- Lazy-loaded images using next/image

- Mobile Responsive Design

## ⚙️ Deployment

🔸 Frontend (Vercel)

```bash
vercel --prod
```

🔹 Backend (Firebase Functions)

```bash
firebase deploy --only functions
```

## 🧪 GitHub Actions

- `deploy-vercel.yml` → Auto deploy frontend to Vercel

- `deploy-functions.yml` → Auto deploy NestJS to Firebase Functions

## 📌 Notes

Only commits with specific flags (--deploy-func, --deploy-vercel) will trigger deployment.

All dynamic routes use server-components and use client only where needed.
