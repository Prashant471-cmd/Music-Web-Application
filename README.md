# React + Vite
https://melo.prashantdeuja.com.np/

To run this application, first clone the repository using `git clone`, and then run `docker compose up -d --build`.
``

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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
