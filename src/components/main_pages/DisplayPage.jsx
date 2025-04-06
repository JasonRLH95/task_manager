import React, { useEffect, useState } from 'react';
import "../../style/displayPage.css";
import TaskForm from '../new_task_page/TaskForm';
// import AllTasks from "../all_tasks_page/AllTasks";
import AllTasks from "../allTasksPage_copy/AllTasks";
import History from "../history_page/History";
import Switch from '../global_components/Switch';

export default function DisplayPage({ darkMode,changeDarkMode, switchDivRef, switchCircleRef, switchSwitchRef, display, tasks, setTasks, currentUser, connected, renderDMSVisibility, handleLogout }) {

    
    const [loading,setLoading] = useState(true);

    // ------------------------------------
    // fetch all according to display page presented
    // when display on AllTasks - fetch all tasks
    // when display on History - fetch only closed tasks
    // ------------------------------------
    const [fetchAllFlag,setFetchAllFlag] = useState(false);
    const [fetchHistoryFlag,setFetchHistoryFlag] = useState(false); 
    useEffect(()=>{
        if(display === 0){
            setLoading(true);
            setFetchAllFlag(!fetchAllFlag);
        }
        if(display === 2){
            setLoading(true);
            setFetchHistoryFlag(!fetchHistoryFlag);
        }
    },[display])
    
    
    // ------------------------------------
    // change the component displayed on displayPage according to navbar button selected
    // ------------------------------------
    const renderPage=()=>{
        if(display === 0){
            return <AllTasks darkMode={darkMode} loading={loading} setLoading={setLoading} flag={fetchAllFlag} setFlag={setFetchAllFlag} tasks={tasks} setTasks={setTasks} currentUser={currentUser} connected={connected} renderDMSVisibility={renderDMSVisibility}/>
        }
        if(display === 1){
            window.scrollBy({ top: 500, behavior: "smooth" });
            return <TaskForm currentUser={currentUser}/>
        }
        if(display === 2){
            return <History loading={loading} setLoading={setLoading} flag ={fetchHistoryFlag} setFlag={setFetchHistoryFlag} tasks={tasks} setTasks={setTasks} currentUser={currentUser}/>
        }
    }

  return (
    <div className='displayPage_component' style={{minHeight:"90vh"}}>
        {connected && <div className="connected_darkMode_switch">
                  <Switch moveSwitch={changeDarkMode} switchDivRef={switchDivRef} switchCircleRef={switchCircleRef} switchSwitchRef={switchSwitchRef}/>
                </div>}
        <button className='taskManager_logoutBtn' onClick={()=>{handleLogout()}}>Logout</button>
        {renderPage()}
    </div>
  )
}
