import React from "react";
import "./Header.css";
import HomeVideo from "../../media/HomeVideo.mp4";
const Header = () =>{
    return(
        <div className="main">
            <div className="overlay"></div>
            <video src={HomeVideo} autoPlay loop muted />
            <div className="content">
                <h1>Welcome To</h1>
                <h1>Incredible India</h1>
            </div>
        </div>
    );
}

export default Header;