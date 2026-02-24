import logo from "../assets/AppLogo.png";
import getStartPage from "../assets/LoginPic.png";

const Welcome = () => {

    return(
        <>
        <div className="welcomePage" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url(${getStartPage})`}}>
            <div className="welcomePage-logo">    
                <img src={logo} alt="App Logo" />
            </div>

            <div className="welcomePage-content">
                <h1>
                    Listen music from your <br/>
                    Favourite artist
                </h1>

                <button>
                    <strong>Get started</strong>
                </button>
            </div>
        </div>
        </>
    )
}

export default Welcome;