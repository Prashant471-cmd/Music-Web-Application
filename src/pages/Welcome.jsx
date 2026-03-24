import { Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/AppLogo.png";
import getStartPage from "../assets/LoginPic.png";
// import Login from "../components/LoginPage";
import Dashboard from "../pages/Dashboard";
import { use } from "react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="welcomePage"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.7)), url(${getStartPage})`,
        }}
      >
        <div className="welcomePage-logo">
          <img src={logo} alt="App Logo" />
        </div>

        <div className="welcomePage-content">
          <h1>
            Listen music from your <br />
            Favourite artist
          </h1>

          {/* <button className="buttons" onClick={() => navigate("/dashboard")}> */}
          <button className="buttons" onClick={() => navigate("/login")}>
            <strong>Get started</strong>
          </button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
