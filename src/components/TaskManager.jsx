import React, { useState } from 'react'
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';

export default function TaskManager() {
    const [connected,setConncted] = useState(false);// => connection flag
    const [signUp,setSignUp] = useState(false);// => signin/signup display flag
    const [tasks,setTasks] = useState(null);// => user's tasks array according to userID
    const [currentUser,setCurrentUser] = useState(null);//=> when sign in, catch the userID
    
    // ---------------------------
    // render display on the
    // home page layer
    // ---------------------------
    const checkConnection=()=>{
        if(connected){
            return <Home tasks={tasks} setTasks={setTasks} currentUser={currentUser} setCurrentUser={setCurrentUser} setConncted={setConncted}/>
        }
        else{
            if(signUp){
                return <Signup setSignUp={setSignUp}/>
            }
            else{
                return <Signin setConncted={setConncted} setSignUp={setSignUp} setTasks={setTasks} setCurrentUser={setCurrentUser}/>
            }
        }
    }
    return (
    <div>
        {checkConnection()}
    </div>
    )
}
