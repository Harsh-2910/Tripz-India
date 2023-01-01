import React,{useState} from "react";
import {Paper,Typography} from "@mui/material";
import "./SignUp.css";
import { Link } from "react-router-dom";
import CustomAlert from "../CustomAlert";

const SignUp = () => {
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [alert,setAlert] = useState(null);
    const showAlert = (message,type,title) =>{
        setAlert({
            msg:message,
            type:type,
            title:title,
        })
    }
    async function signup(){
        fetch("http://localhost:5000/register",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                password,
            }),
            })
            .then((res)=>res.json())
            .then((data)=>{
             showAlert("Thankyou for registering","info","Sign Up Successful");
             window.location.href = "./login";
            });
    }
    return (
        <>
        <CustomAlert alert={alert}/>
        <div className="page">
            <div className="card">
            <Paper elevation={3} className="cardContent">
                <Typography textAlign="center" variant="h5" gutterBottom paddingY="15px">
                Sign Up
                </Typography>
                <label>First name</label>
                <input 
                type="text" 
                placeholder="Enter fname" 
                className="form-control"
                onChange={(e)=>setFname(e.target.value)}
                />
                <br/>
                <label>Last name</label>
                <input 
                type="text" 
                placeholder="Enter lname" 
                className="form-control"
                onChange={(e)=>setLname(e.target.value)}
                />
                <br/>
                <label>Email</label>
                <input 
                type="email" 
                placeholder="Enter email" 
                className="form-control"
                onChange={(e)=>setEmail(e.target.value)}
                />
                <br/>
                <label>Password</label>
                <input 
                type="password" 
                placeholder="Enter password" 
                className="form-control"
                onChange={(e)=>setPassword(e.target.value)}
                />
                <br/>
                <div>
                <button onClick={signup} className="btn btn-dark">Sign Up</button>
                <p>Already registered <Link to={"/login"}>sign in?</Link></p>
                </div>
            </Paper>
            </div>
        </div>
        </>
    );
}

export default SignUp;