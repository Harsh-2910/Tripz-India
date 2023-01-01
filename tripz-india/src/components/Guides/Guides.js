import { Grid, Typography, Container, Toolbar } from "@material-ui/core";
import React from "react";
import Guide from "./Guide/Guide";
import brand from "../../media/brand.png";
import { useState,useEffect } from "react";
import { AppBar } from "@mui/material";

const Guides = () => {
  const states = [
    "",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman & Diu",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const [guides,setGuides] = useState([]);
  const [chosenState,setChosenState] = useState("");
  useEffect(()=>{
    let url = "http://localhost:5000/guides/"+chosenState;
    console.log(url);
    fetch(url,{
      method:"GET",
    })
    .then((res)=>res.json())
    .then((data)=>{
      setGuides(data);
    });
  },[chosenState]);

  return (
    <div className="allGuides">
      <AppBar position="static" color="inherit">
        <Container maxWidth="xl">
          <Toolbar disableGutters className="container">
            <Typography href="/" component="a">
              <img className="brandLogo" src={brand} alt="Tripz India" />
            </Typography>
            <div className="form-group" style={{"flexWrap":"nowrap"}}>
              <label>Choose by State or UT</label>
              <select onChange={(e)=>setChosenState(e.target.value)} className="form-control">
                {states.map((state) => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <br />
      <br />
      <Grid container justifyContent="center">
        {guides.map((guide)=>(
          <Grid key={guide._id} item xs={12} sm={6} md={4} lg={3}>
          <Guide guide={guide}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Guides;
