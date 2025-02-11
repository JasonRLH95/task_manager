import React, { useState } from 'react';
import "../style/signup.css";
import { addUser } from '../firebase/connections';

export default function Signup({ setSignUp }) {
  const [signEmail,setSignEmail] = useState("");
  const [signPass,setSignPass] = useState("");
  const [signRepass,setSignRepass] = useState("");

  // -----------------------------
  // Adding the new user if not exist
  // and all the inputs are valid
  // -----------------------------
  const signupFetch=()=>{
    if(signEmail === "" || signPass === "" || signRepass === ""){
      return alert("Must fill all fields first!");
    }
    if(signPass !== signRepass){
      return alert("Password don't match");
    }
    if(!signupValidation(signEmail, signPass)){
      return alert("Please make sure you fill all fields correctly");
    }
    try{
      addUser(signEmail, signPass)
      .then(data=>{
        if(data != null){
          setSignUp(false);
        }
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

  // -----------------------------
  // Sign up inputs validation
  // -----------------------------
  const signupValidation=(email, pass)=>{
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
    <div className='signup_component'>
      <h1 className='signup_header'>Sign up</h1>
      <div className="signup_container">
        <div className="signup_inputsDiv">
          <input type="text" className="signup_input" placeholder='Email' onChange={(e)=>{setSignEmail(e.target.value)}}/>
          <input type="text" className="signup_input" placeholder='Password' onChange={(e)=>{setSignPass(e.target.value)}}/>
          <input type="text" className="signup_input" placeholder='Re-password' onChange={(e)=>{setSignRepass(e.target.value)}}/>
        </div>
        <button className='signup_button' onClick={()=>{signupFetch()}}>Let's Go</button>
      </div>
      <button className='signup_signinBtn' onClick={()=>{setSignUp(false)}}>Sign in</button>
    </div>
  )
}
