import React,{ useState } from 'react';
import "../style/taskManager.css";
import Navbar from './Navbar';
import DisplayPage from './DisplayPage';
import News from './News';

export default function Home({ tasks, setTasks, currentUser, setCurrentUser, setConncted }) {
    const [display,setDisplay] = useState(0);
    return (
        <div className='taskManager_component'>
            <button className='taskManager_logoutBtn' onClick={()=>{setConncted(false); setCurrentUser(null); setTasks(null)}}>Logout</button>
            <News/>
            <Navbar display={display} setDisplay={setDisplay}/>
            <DisplayPage display={display} tasks={tasks} setTasks={setTasks} currentUser={currentUser}/>
        </div>
    )
}
