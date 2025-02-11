import React, { useState } from 'react';
import "../style/signin.css";
import { findUser } from '../firebase/connections';

export default function Signin({ setConncted, setSignUp, setTasks, setCurrentUser }) {
    const [loginEmail,setLoginEmail] = useState("");
    const [loginPassword,setLoginPassword] = useState("");

    // --------------------------
    // search user on users DB and
    // return his tasks and uid
    // --------------------------
    const login=()=>{
        if(loginEmail === "" || loginPassword === ""){
            return alert("must fill all fields first!");
        }
        if(!loginValidation(loginEmail,loginPassword)){
            return alert("Please check your cradentials and try again");
        }
        try{
            findUser(loginEmail, loginPassword)
            .then(data=>{
                setTasks(data.tasks);
                setCurrentUser(data.id);
                setConncted(true);
            })
            .catch(error=>{
              console.error("Error adding document:\n", error);
            })
        }
        catch(err){
            console.log(err);
            return alert("Sorry, something went wrong please try again later");
        }
    }

    // --------------------------
    // credentials validation
    // --------------------------
    const loginValidation=(email, pass)=>{
        if(email.length < 10 || email.length > 45 || !email.includes("@")){
            return false;
        }
        if(pass.length < 6 || pass.length > 30){
            return false;
        }
        for(let i = 0; i < pass.length; i++){
            if((pass[i] >= "a" && pass[i] <= "z") || (pass[i] >= "A" && pass[i] <= "Z") || (pass[i] >= 0 && pass[i] <= 9)){
                continue;
            }
            else{
                return false;
            }
        }
        return true;
    }

  return (
    <div className='signin_components'>
        <h1 className="signin_header">Task Manager</h1>
        <div className="signin_container">
            <div className="signin_inputsDiv">
                <input type="text" className="signin_input" placeholder='Email' onChange={(e)=>{setLoginEmail(e.target.value)}}/>
                <input type="text" className="signin_input" placeholder='Password' onChange={(e)=>{setLoginPassword(e.target.value)}}/>
            </div>
            <button className="signin_button" onClick={()=>{login()}}>Login</button>
        </div>
        <button className='signin_signupBtn' onClick={()=>{setSignUp(true)}}>sign up</button>
    </div>
  )
}
