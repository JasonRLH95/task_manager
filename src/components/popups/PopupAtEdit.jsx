import React, { useState } from 'react';
import { updateTask } from '../../firebase/connections';
import "../../style/popupAtEdit.css";

export default function PopupAtEdit({ setSelectedTask, setEditFlag, popupPosition, setCurrentTask, task, flag, setFlag, currentUser }) {
    const [subject,setSubject] = useState(task.subject);
    const [task_owner,setTaskOwner] = useState(task.task_owner);
    const [task_desc,setTaskDesc] = useState(task.task_desc);
    const [task_exp_date,setTaskExpDate] = useState(task.task_exp_date);


     const saveEdit=()=>{

        const updatedTask = {
            deleted:task.deleted,
            subject,
            urgency:task.urgency,
            task_owner,
            task_desc,
            task_exp_date,
            task_status:task.task_status,
            taskCreatedAt: task.taskCreatedAt,
            taskUpdatedAt: new Date(),
            userID:currentUser,
        }
        // -----------
        // make validations first before send to firestore
        // -----------
        const isValid = taskValidation(updatedTask);
        if(isValid){
          updateTask(task, updatedTask)
          .then((data)=>{
                setSelectedTask(null);
                setCurrentTask(null);
                setEditFlag(false);
                setFlag(!flag);
                alert("The task successfully updated!")
            })
            .catch((error) => {
                console.error("Error adding document:\n", error);
            });
        }
    }

    // ----------------------------
    // validate newTask parameters
    // ----------------------------
    const taskValidation=(task)=>{
      if(task.subject === "" || task.subject.length < 4 ){
        return alert("Subject must be at least 4 characters length");
      }
      if(task.subject.length > 36 ){
        return alert("Subject can't be more then 36 characters length");
      }
      if(task.task_owner === "" || task.task_owner.length < 4){
        return alert("Task's owner name must be at least 4 characters length");
      }
      if(task.task_owner.length > 15){
        return alert("Task's owner name can't be more then 15 characters length");
      }
      if(task.task_desc === "" || task.task_desc.length < 4){
        return alert("Task's description must be at least 4 characters length");
      }
      if(task.task_exp_date === ""){
        return alert("You must add an expiration date first!");
      }
      return true;
    }
  return (
    <div className='popupAtEdit_component' style={{top:`${popupPosition}px`}}>
        <div className="XbtnDiv">
          <button className='popupAtEdit_Xbtn' onClick={()=>{setEditFlag(false);}}>X</button>
        </div>
        <input className='popupAtEdit_input' type='text' placeholder='Subject' onChange={(e)=>{setSubject(e.target.value)}}/>
        <input className='popupAtEdit_input' type='text' placeholder='Description' onChange={(e)=>{setTaskDesc(e.target.value)}}/>
        <input className='popupAtEdit_input' type='text' placeholder='Owner' onChange={(e)=>{setTaskOwner(e.target.value)}}/>
        <input className='popupAtEdit_input' type='date' placeholder='experition date' onChange={(e)=>{setTaskExpDate(e.target.value)}}/>
        <button className="saveEditBtn" onClick={()=>{saveEdit()}}>Save</button>
    </div>
  )
}
