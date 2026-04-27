# React + Vite
https://melo.prashantdeuja.com.np/

##  Running the Music Web Application

Follow the steps below to run the application locally using **Docker Compose**.

### ✅ Prerequisites
Make sure you have **Git**, **Docker**, and **Docker Compose** installed on your system.

### 📥 Step 1: Clone the Repository
First, clone the project from GitHub using `git clone https://github.com/Prashant471-cmd/Music-Web-Application.git`, then move into the project directory with `cd Music-Web-Application`.

### 🐳 Step 2: Build and Run the Application
Build and start the application using Docker Compose by running `docker compose up -d --build`.  
The `--build` flag ensures the image is rebuilt using the latest source code, and `-d` runs the containers in detached (background) mode.

### 🌐 Step 3: Access the Application
Once the containers are running, open your browser and visit `http://localhost`.  
🎵 The Music Web Application will now be running and served via Nginx.

### 🛑 Stopping the Application (Optional)
To stop and remove the running containers, run `docker compose down`.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Spotify login notes (Docker)

This app uses **Spotify Authorization Code + PKCE** (no client secret in the frontend).

- The Spotify **Client ID is public** and will be visible in the browser/network. Do **not** put a client secret in this repo.
- OAuth redirect URIs must match **exactly** what is configured in the Spotify Developer Dashboard.
	- Vite dev usually runs at `http://localhost:5173/login`
	- Docker/NGINX in this repo serves on port 80, so it becomes `http://localhost/login`

If login works on `npm run dev` but not in Docker, add `http://localhost/login` to your Spotify app's Redirect URIs, then rebuild the Docker image.

Optional: set `VITE_SPOTIFY_REDIRECT_URI` at build time to force a specific redirect URI.

```
Music-Web-Application
├─ dockerfile
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ src
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ AppLogo.png
│  │  ├─ bandlogo.png
│  │  ├─ LoginPic.png
│  │  └─ pic.png
│  ├─ components
│  │  ├─ BottomNav.jsx
│  │  ├─ Layout.jsx
│  │  └─ Player.jsx
│  ├─ index.css
│  ├─ LoginSystem
│  │  ├─ Login.css
│  │  └─ LoginPage.jsx
│  ├─ main.jsx
│  └─ pages
│     ├─ Album.jsx
│     ├─ Artist.jsx
│     ├─ Dashboard.jsx
│     ├─ Library.jsx
│     ├─ Profile.jsx
│     ├─ Search.jsx
│     ├─ Song.jsx
│     └─ Welcome.jsx
├─ vercel.json
└─ vite.config.js

```
