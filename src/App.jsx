import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./LoginSystem/LoginPage";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes inside the Layout (These get the bottom Navbar!) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Temporary placeholders for your other pages */}
          <Route
            path="/search"
            element={
              <div
                style={{
                  color: "white",
                  padding: "20px",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                Search Page
              </div>
            }
          />
          <Route
            path="/library"
            element={
              <div
                style={{
                  color: "white",
                  padding: "20px",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                Library Page
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
