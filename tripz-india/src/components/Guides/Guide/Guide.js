import React from "react";
import "./Guide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationDot,
  faPhone,
  faIndianRupeeSign,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

library.add(faLocationDot, faPhone, faIndianRupeeSign, faAward);

const Guide = ({guide}) => {
  const imgurl= `http://localhost:5000/profileimages/${guide.imgsrc}`;
  return (
    <>
      <div className="profilecard">
        <div className="profilecard-image">
          <img src={imgurl} alt="Profile" />
        </div>
        <p className="name">{guide.fullname}</p>

        <div>
          <strong>About Guide</strong>
          <p className="about">
            {guide.bio}
          </p>
        </div>

        <div className="container">
          <div>
            <FontAwesomeIcon icon="location-dot" />
            <span> {guide.location}, India</span>
          </div>

          <div>
            <FontAwesomeIcon icon="phone" />
            <span> {guide.mobileno}</span>
          </div>
        </div>

        <div className="container">
          <div>
            <strong>Price/day (in </strong>
            <FontAwesomeIcon icon="indian-rupee-sign" />
            <span>) {guide.price}</span>
          </div>

          <div>
            <strong>Experience </strong>
            <FontAwesomeIcon icon="award" />
            <span> {guide.experience} years</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Guide;
