import React,{useState} from "react";
import {Paper,Typography} from "@mui/material";
import CustomAlert from "../CustomAlert";
import "./LoginPage.css";

const LoginPage = () => {
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
    async function login(){
        // console.log(email,password);
        fetch("http://localhost:5000/login",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify({
                email,
                password,
            }),
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.status==="ok"){
                    showAlert("Login successful","success","Success");
                    window.localStorage.setItem("token",data.data);
                    window.localStorage.setItem("loggedIn",true);
                    window.localStorage.setItem("email",email);
                    window.location.href = "./";
                }
                else showAlert("Wrong email or password","error","User Not Found");
            });
    }
    return (
        <>
        <CustomAlert alert={alert}/>
        <div className="page">
            <div className="card">
            <Paper elevation={3} className="cardContent">
                <Typography variant="h5" gutterBottom paddingY="15px">
                Sign in
                </Typography>
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
                <button onClick={login} className="btn btn-dark">Login</button>
                </div>
            </Paper>
            </div>
        </div>
        </>
    );
}

export default LoginPage;