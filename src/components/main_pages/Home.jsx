import React,{ useState } from 'react';
import "../../style/home.css";
import Navbar from '../global_components/Navbar';
import DisplayPage from './DisplayPage';
import News from '../global_components/News';

export default function Home({ darkMode,changeDarkMode, switchDivRef, switchCircleRef, switchSwitchRef, tasks, setTasks, currentUser, handleLogout, connected, renderDMSVisibility }) {
    const [display,setDisplay] = useState(0);

    return (
        <div className='taskManager_component'>
            
            <News/>
            <Navbar display={display} setDisplay={setDisplay}/>
            <DisplayPage darkMode={darkMode} changeDarkMode={changeDarkMode} switchDivRef={switchDivRef} switchCircleRef={switchCircleRef} switchSwitchRef={switchSwitchRef} display={display} tasks={tasks} setTasks={setTasks} currentUser={currentUser} connected={connected} renderDMSVisibility={renderDMSVisibility} handleLogout={handleLogout}/>
        </div>
    )
}
