import React, { useState } from 'react';
import '../../style/taskHistory.css';
import { absoluteErase } from '../../firebase/connections';

export default function TaskHistory({ task, setFlag, flag, currentUser, setSearchTerm }) {

  const [detailsFlag,setDetailsFlag] = useState(false);
  
  
  // ------------------------------
  // erase the task from the database
  // ------------------------------
  const eraseTask=()=>{
    absoluteErase(task, currentUser)
    .then(data =>{
      if(data.msg === "ok"){
        setSearchTerm("");
        setFlag(!flag);
      }
    })
    .catch(error=>{
      console.error("Error erasing document:\n", error);
    })
  }
  return (
    <div className='taskHistory_component'>
        <div className='taskHistory_container'>
          <div className="taskHistory_deleteBtn" onClick={()=>{eraseTask()}}></div>
          <div className='taskHistory_subject' onClick={()=>{setDetailsFlag(!detailsFlag)}}>
            {task.subject}
          </div>
          <div className="taskHistory_mainDetails">
            <h4 className='taskHistory_mainDetails_h4'><b>Submission Date:<br/></b> {task.task_exp_date}</h4>
            <h4 className='taskHistory_mainDetails_h4'><b>for:<br/></b> {task.task_owner}</h4>
            <h4 className='taskHistory_mainDetails_h4'><b>status: </b>{task.task_status}</h4>
          </div>
        </div>
        {detailsFlag && <div className="taskHistory_description_dropDown">
          {task.task_desc}
        </div>}
    </div>
  )
}
