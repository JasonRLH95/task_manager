import React, { useState } from 'react';
import "../../style/taskManager.css";
import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';

export default function TaskManager({ darkMode,changeDarkMode, switchDivRef, switchCircleRef, switchSwitchRef, connected, setConncted, currentUser, setCurrentUser, tasks, setTasks, handleLogout, renderDMSVisibility }) {
    const [signUp,setSignUp] = useState(false);// => signin/signup display flag

    
    // ---------------------------
    // render display on the
    // home page layer
    // ---------------------------
    const checkConnection=()=>{
        if(connected){
            return <Home darkMode={darkMode} changeDarkMode={changeDarkMode} switchDivRef={switchDivRef} switchCircleRef={switchCircleRef} switchSwitchRef={switchSwitchRef} tasks={tasks} setTasks={setTasks} currentUser={currentUser} handleLogout={handleLogout} connected={connected} renderDMSVisibility={renderDMSVisibility}/>
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
    <div className='taskManager_component'>
        {checkConnection()}
    </div>
    )
}
