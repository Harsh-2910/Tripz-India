import React,{useState} from 'react';
import "./DeleteProfile.css";
import CustomAlert from "../CustomAlert";

const DeleteProfile = () =>{
    const [alert,setAlert] = useState(null);
    const showAlert = (message,type,title) =>{
        setAlert({
            msg:message,
            type:type,
            title:title,
        })
    }
    async function deleteyourProfile(){
        const Email = window.localStorage.getItem("email");
        console.log(Email);
        fetch("http://localhost:5000/deleteProfile",{
            method:'DELETE',
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*"
            },
            body: JSON.stringify({
                email: Email,
            })
        })
        .then((res)=>{
            showAlert("Your profile is delete","info","Deleted");
        })
    }
    return(
        <>
        <CustomAlert alert={alert}/>
        <div className='deletepage'>
            <h1>Please confirm you want to delete your guide profile</h1>
            <button 
            className="btn btn-success btn-lg"
            onClick={deleteyourProfile}
            >
            Confirm
            </button>
        </div>
        </>
        
    );
}

export default DeleteProfile;