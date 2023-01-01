import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./Footer.css";

const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <div className="footerbody">
      <h2 className="centerComp" >FOLLOW US</h2>
      <hr color="#4a7672" />
      <div className="centerComp">
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <TwitterIcon className="socialicon" />
        </a>
        <a href="https://facebook.com/" target="_blank" rel="noreferrer">
          <FacebookOutlinedIcon className="socialicon" />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer">
          <InstagramIcon className="socialicon" />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          <LinkedInIcon className="socialicon" />
        </a>
      </div>

      <div className="centerComp" >
        <p>© Copyright {year} Tripz-India</p>
      </div>
    </div>
  );
};

export default Footer;
