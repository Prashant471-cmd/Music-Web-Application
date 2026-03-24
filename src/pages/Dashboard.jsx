import { Outlet } from "react-router-dom";
import logo from "../assets/AppLogo.png";
import getStartPage from "../assets/LoginPic.png";

const Dashboard = () => {
  return (
    <>
      <div
        className="dashboard-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.8)), url(${getStartPage})`,
        }}
      >
        <header className="dash-header">
          <div className="welcomePage-logo">
            <img src={logo} alt="App Logo" />
          </div>

          <div className="header-icons">
            <span className="icon">bell</span>
            <span className="icon">profile</span>
          </div>
        </header>

        <h2 className="greeting">Good afternoon, dear!</h2>

        <section className="media-section">
          <div className="section-header">
            <h3>Pick up where you left</h3>
            <button className="view-all">View all</button>
          </div>
          <div className="horizontal-scroll">
            <div className="square-card"></div>
            <div className="square-card"></div>
            <div className="square-card"></div>
          </div>
        </section>

        <section className="media-section">
          <div className="section-header">
            <h3>For you</h3>
            <button className="view-all">View all</button>
          </div>
          <div className="horizontal-scroll">
            <div className="large-card"></div>
            <div className="large-card"></div>
          </div>
        </section>

        <section className="list-section">
          <h3>Popular songs</h3>

          <div className="song-item">
            <div className="song-img"></div>
            <div className="song-info">
              <h4>Perfect</h4>
              <p>Ed Sheeran</p>
            </div>
            <button className="play-btn">▶</button>
          </div>
          <div className="song-item">
            <div className="song-img"></div>
            <div className="song-info">
              <h4>Timi Nai Hau</h4>
              <p>Sabin Rai</p>
            </div>
            <button className="play-btn">▶</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard
