import React from "react";
import LoginPage from "./Login Page/LoginPage"
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import SignUp from "./Sign Up/SignUp";
import Guides from "./Guides/Guides";
import ProfileForm from "./Create Guide Profile/ProfileForm";
import DeleteProfile from "./Delete Guide Profile/DeleteProfile";
const isloggedIn = window.localStorage.getItem("loggedIn");
const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/login" element={<LoginPage/>}/>
                    <Route exact path="/signup" element={<SignUp/>}/>
                    <Route exact path="/guides" element={isloggedIn?<Guides/>:<SignUp/>}/>
                    <Route exact path="/createProfile" element={isloggedIn?<ProfileForm/>:<SignUp/>}/>
                    <Route exact path="/deleteProfile" element={isloggedIn?<DeleteProfile/>:<SignUp/>}/>
                </Routes>
            </div>
        </Router>
    );
}
export default App;