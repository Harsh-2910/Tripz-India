import React,{useState,useEffect} from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Aboutus from "../About Us/Aboutus";
import Footer from "../Footer/Footer";

const HomePage = () =>{
    const [userDetails,setUserDetails] = useState({});
    useEffect(()=>{
        fetch("http://localhost:5000/userData",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*"
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token")
        }),
        })
        .then((res)=>res.json())
        .then((data)=>{
        // console.log(data,"userRegister");
        setUserDetails(data.data);
        });
    });
    
    return (
        <div>
        <Navbar userDetails={userDetails}/>
        <Header/>
        <Aboutus/>
        <Footer/>
        </div>
    );
}

export default HomePage;