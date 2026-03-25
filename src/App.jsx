import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./LoginSystem/LoginPage";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

import Search from "./pages/Search"; // Check if you used lowercase 'search.jsx' or uppercase 'Search.jsx'
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Song from "./pages/Song";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes inside the Layout (These get the bottom navbar) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />

          {/* We will eventually make these dynamic (like /artist/:id), but static is perfect for testing the UI right now */}
          <Route path="/artist" element={<Artist />} />
          <Route path="/album" element={<Album />} />
          <Route path="/song" element={<Song />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
