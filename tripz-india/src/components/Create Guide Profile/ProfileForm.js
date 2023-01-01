import React,{useState} from 'react';
import { Grid,Paper } from '@mui/material';
import { Typography } from '@material-ui/core';
import {Button} from '@mui/material';
import "./ProfileForm.css"
import CustomAlert from "../CustomAlert";

const ProfileForm = () => {
    const states = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar",
    "Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand","Uttar Pradesh","West Bengal",
    "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman & Diu","Delhi","Jammu & Kashmir","Ladakh","Lakshadweep","Puducherry"];
    const [fullname,setName] = useState("");
    const [mobileno,setMobileNo] = useState("");
    const [experience,setExp] = useState("");
    const [price,setPrice] = useState("");
    const [bio,setBio] = useState("");
    const [location,setLocation] = useState("");
    const [imageUploaded,setImageUploaded] = useState(null);
    const [alert,setAlert] = useState(null);
    const showAlert = (message,type,title) =>{
        setAlert({
            msg:message,
            type:type,
            title:title,
        })
    }

    async function create(){
        const formdata = new FormData();
        formdata.append("fullname",fullname);
        formdata.append("bio",bio);
        formdata.append("mobileno",mobileno);
        formdata.append("experience",experience);
        formdata.append("price",price);
        formdata.append("location",location);
        formdata.append("guideImage",imageUploaded);
        formdata.append("email",window.localStorage.getItem("email"));

        fetch("http://localhost:5000/createProfile",{
            method: "POST",
            body: formdata
        })
        .then((data)=>{
            showAlert("Your profile is created","info","Created");
        })
    }

    return (
        <>
        <CustomAlert alert={alert}/>
        <div className = "formPage">
            <Paper elevation={3} className="formContent">
                <Typography variant="h5" gutterBottom>Create Profile</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder="Enter full name" 
                        className="form-control"
                        onChange={(e)=>setName(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <label>Contact Number</label>
                    <input
                        type="text"
                        placeholder="Enter contact number" 
                        className="form-control"
                        onChange={(e)=>setMobileNo(e.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <label>Experience</label>
                    <input
                        type="text"
                        placeholder="Enter in years" 
                        className="form-control"
                        onChange={(e)=>setExp(e.target.value)}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <label>Price for service</label>
                    <input
                        type="text"
                        placeholder="Enter rupees per day" 
                        className="form-control"
                        onChange={(e)=>setPrice(e.target.value)}
                    />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <div className="form-group">
                    <label>Bio</label>
                    <textarea onChange={(e)=>setBio(e.target.value)} className="form-control"/>
                    </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                    <div className='form-group'>
                    <label>State or UT</label>
                    <select onChange={(e)=>setLocation(e.target.value)} className="form-control">
                    {states.map((state)=>(
                        <option key={state}>{state}</option>
                    ))}
                    </select>
                    </div>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                    <div className="form-group">
                    <label>Upload profile photo</label>
                    <input 
                    type="file" 
                    name='guideImage'
                    className="form-control-file"
                    onChange={(e)=>setImageUploaded(e.target.files[0])}
                    />
                    </div>
                    </Grid>

                    <Grid item xs={6} sm={6}>
                    <Button variant="contained" onClick={create}>
                    Submit
                    </Button>
                    </Grid>

                </Grid>
            </Paper>
        </div>
        </>
        
    );
}

export default ProfileForm;