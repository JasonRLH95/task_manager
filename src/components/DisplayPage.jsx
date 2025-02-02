import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import AllTasks from "./AllTasks";
import History from "./History";

export default function DisplayPage({display}) {

    const [tasks,setTasks] = useState(null);
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
            return <AllTasks loading={loading} setLoading={setLoading} flag={fetchAllFlag} setFlag={setFetchAllFlag} tasks={tasks} setTasks={setTasks}/>
        }
        if(display === 1){
            return <TaskForm/>
        }
        if(display === 2){
            return <History loading={loading} setLoading={setLoading} flag ={fetchHistoryFlag} tasks={tasks} setTasks={setTasks}/>
        }
    }

  return (
    <div>{renderPage()}</div>
  )
}
