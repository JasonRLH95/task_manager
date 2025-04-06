import React from 'react';
import "../../style/taskDetails_copy.css";
import Urgency from './Urgency';

export default function TaskDetails({ detailsRef, urgencyRef, setUrgencyFlag, urgencyFlag, setSelectedTask, setUrgency, inx, task, statusRef, urgencyDivRef }) {
  return (
    <div ref={detailsRef} className="task_mainDetails">
        <h4 className='task_mainDetails_h4'><b>Submission Date:</b> {task.task_exp_date}</h4>
        <h4 className='task_mainDetails_h4'><b>For:</b> {task.task_owner}</h4>
        <h4 className='task_mainDetails_h4'><b>Status: </b><span ref={statusRef}></span></h4>
        {<h4 className='task_mainDetails_h4' ref={urgencyDivRef}><b>Urgency:</b>
          <div className="task_mainDetails_urgencyDiv" ref={urgencyRef} onClick={()=>{
              setUrgencyFlag(!urgencyFlag);
              setSelectedTask(inx);
          }}>
              {urgencyFlag && <Urgency setUrgency={setUrgency}/>}
          </div>
        </h4>}
    </div>
  )
}
