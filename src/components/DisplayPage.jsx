import React, { useEffect, useState } from 'react';
import "../style/displayPage.css";
import TaskForm from './TaskForm';
import AllTasks from "./AllTasks";
import History from "./History";

export default function DisplayPage({ display, tasks, setTasks, currentUser }) {

    
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
            return <AllTasks loading={loading} setLoading={setLoading} flag={fetchAllFlag} setFlag={setFetchAllFlag} tasks={tasks} setTasks={setTasks} currentUser={currentUser}/>
        }
        if(display === 1){
            return <TaskForm currentUser={currentUser}/>
        }
        if(display === 2){
            return <History loading={loading} setLoading={setLoading} flag ={fetchHistoryFlag} setFlag={setFetchHistoryFlag} tasks={tasks} setTasks={setTasks} currentUser={currentUser}/>
        }
    }

  return (
    <div className='displayPage_component' style={{minHeight:"90vh"}}>{renderPage()}</div>
  )
}
