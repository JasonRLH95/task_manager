import React, { useState } from 'react';
import '../style/taskHistory.css';

export default function Task({ task }) {

  const [detailsFlag,setDetailsFlag] = useState(false);
    

  return (
    <div className='taskHistory_component'>
        <div className='taskHistory_container'>
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
