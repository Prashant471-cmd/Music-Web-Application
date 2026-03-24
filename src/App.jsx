import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./LoginSystem/LoginPage";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<div>Search page banaunu parxa</div>} />
        <Route
          path="/library"
          element={<div>Library page banaunu parxa</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
