import React from 'react';
import "../../style/taskDetails.css";
import Urgency from './Urgency';

export default function TaskDetails({ detailsRef, urgencyRef, setUrgencyFlag, urgencyFlag, setSelectedTask, setUrgency, inx, task, statusRef }) {
  return (
    <div ref={detailsRef} className="task_mainDetails">
        <div className="task_mainDetails_urgencyDiv" ref={urgencyRef} onClick={()=>{
            setUrgencyFlag(!urgencyFlag);
            setSelectedTask(inx);
        }}>
            {urgencyFlag && <Urgency setUrgency={setUrgency}/>}
        </div>
        <h4 className='task_mainDetails_h4'><b>Submission Date:<br/></b> {task.task_exp_date}</h4>
        <h4 className='task_mainDetails_h4'><b>for:<br/></b> {task.task_owner}</h4>
        <h4 className='task_mainDetails_h4'><b>status: </b><span ref={statusRef}></span></h4>
    </div>
  )
}
