import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./LoginSystem/LoginPage";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";

import Search from "./pages/Search";
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Artist from "./pages/Artist";
import Album from "./pages/Album";
import Song from "./pages/Song";

import "./index.css";

// Helper component to protect routes
const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem("access_token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes inside the Layout */}
        <Route element={ <ProtectedRoute> <Layout /> </ProtectedRoute> }>
          {/* These are actual pages the user sees inside the Layout */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/album" element={<Album />} />
          <Route path="/song" element={<Song />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;