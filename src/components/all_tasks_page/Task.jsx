import React, { useEffect, useState, useRef } from 'react';
import '../../style/task.css';
import { closeTask, changeUrgency, deleteTask } from '../../firebase/connections';
import Switch from '../global_components/Switch';
import TaskDetails from './TaskDetails';

export default function Task({ darkMode, flag, setFlag, selectedTask, setSelectedTask, task, tasks, inx, setCloseFlag, setEditFlag, setDeleteFlag, deleted, setDeleted, doneFlag, setDoneFlag, setPopupPosition, setCurrentTask }) {

  const [switchFlag,setSwitchFlag] = useState(false);// => flag to move the done switch
  const [detailsFlag,setDetailsFlag] = useState(false);// => flag to show/hide task details
  const [urgencyFlag,setUrgencyFlag]= useState(false);// => flag to show/hide urgency selection
  const [urgency,setUrgency]= useState(task.urgency);// => urgency value selected
  
  const switchDivRef = useRef();
  const switchCircleRef = useRef();
  const switchSwitchRef = useRef();
  const taskCompRef = useRef();
  const statusRef = useRef();
  const subjectRef = useRef();
  const detailsRef = useRef();
  const urgencyRef = useRef();
  const editRef = useRef();
  const deleteRef = useRef();
  
  useEffect(()=>{

    renderTasksVisibility();// => move the switch after close task
    
    if(inx === selectedTask && deleted){
      return deleteTaskFetch();// => call request to connect firebase for delete task
    }
    
    if(inx === selectedTask && doneFlag){
      return doneTask();// => after proceed to close, call doneTask to close relevant task selected
    }
    
    if(task.task_status === "open"){
      renderUrgencyVisibility(urgency);// => after change urgency, change the visibility of the urgencyDiv of the task according to value selected
    }
  },[doneFlag, tasks, urgency, deleted, darkMode])
  
  
  
  
  
  // --------------------------------------
  // setting the styles for each task on every filter according to the task details
  // --------------------------------------
  const renderTasksVisibility=()=>{
      if(!switchDivRef || !switchCircleRef || !switchSwitchRef || !taskCompRef || !statusRef || !urgencyRef || !editRef){
        return;
      }
      if(!darkMode){
        if((inx === selectedTask && switchFlag) || (task.task_status === "closed")){
          switchDivRef.current.style.backgroundColor = "rgb(210,20,20)";
          switchDivRef.current.style.opacity = "20%";
          switchCircleRef.current.style.translate = "30px";
          switchSwitchRef.current.style.backgroundColor = "lightgrey";
          taskCompRef.current.style.backgroundColor = "lightgrey";
          taskCompRef.current.style.color = "black";
          subjectRef.current.style.textShadow = "5px 5px 5px grey";
          detailsRef.current.style.textShadow = "3px 3px 3px grey";
          statusRef.current.innerHTML = "closed";
          urgencyRef.current.style.display = "none";
          editRef.current.style.display = "none";
          return;
        }
        else if(!switchFlag && task.task_status === "open"){
          switchDivRef.current.style.backgroundColor = "rgb(19, 230, 19)";
          switchDivRef.current.style.opacity = "100%";
          switchCircleRef.current.style.translate = "0px";
          switchSwitchRef.current.style.backgroundColor = "white";
          taskCompRef.current.style.backgroundColor = "rgba(20,20,210,0.7)";
          taskCompRef.current.style.color = "white";
          subjectRef.current.style.textShadow = "5px 5px 5px black";
          detailsRef.current.style.textShadow = "3px 3px 3px black";
          statusRef.current.innerHTML = "open";
          return;
        }
      }
      if(darkMode){
        if((inx === selectedTask && switchFlag) || (task.task_status === "closed")){
          switchDivRef.current.style.backgroundColor = "rgb(210,20,20)";
          switchDivRef.current.style.opacity = "20%";
          switchCircleRef.current.style.translate = "30px";
          switchSwitchRef.current.style.backgroundColor = "lightgrey";
          taskCompRef.current.style.backgroundColor = "#C5C6C7";
          taskCompRef.current.style.color = "#1F2833";
          subjectRef.current.style.textShadow = "5px 5px 5px grey";
          detailsRef.current.style.textShadow = "3px 3px 3px grey";
          statusRef.current.innerHTML = "closed";
          urgencyRef.current.style.display = "none";
          editRef.current.style.display = "none";
          return;
        }
        else if(!switchFlag && task.task_status === "open"){
          switchDivRef.current.style.backgroundColor = "rgb(19, 230, 19)";
          switchDivRef.current.style.opacity = "100%";
          switchCircleRef.current.style.translate = "0px";
          switchSwitchRef.current.style.backgroundColor = "white";
          taskCompRef.current.style.backgroundColor = "#1F2833";
          taskCompRef.current.style.color = "#45A29E";
          subjectRef.current.style.textShadow = "5px 5px 5px black";
          detailsRef.current.style.textShadow = "3px 3px 3px black";
          statusRef.current.innerHTML = "open";
          return;
        }
      }
    }
    // --------------------------------------
    // changes the urgency, whenever task closed => disappear urgency and edit options
    // --------------------------------------
    const renderUrgencyVisibility=(_urgency)=>{
      if(task.task_status === "open"){
        if(_urgency === "Low"){
          urgencyRef.current.style.backgroundColor = "green";
        }
        else if(_urgency === "Medium"){
          urgencyRef.current.style.backgroundColor = "orange";
        }
        else if(_urgency === "High"){
          urgencyRef.current.style.backgroundColor = "red";
        }
        else{
          urgencyRef.current.style.display = "none";
          editRef.current.style.display = "none";
        }
        changeUrgencyFetch(_urgency);// => call request to connect firebase for change task urgency
        setUrgencyFlag(false);// => close urgency selection div
      }
    }




// ----------------------------------------------------------------
// connections with firebase
// ----------------------------------------------------------------

    // --------------------------------------
    // closing the task and render the relevant changes
    // --------------------------------------
    const doneTask=()=>{
      
      // ----------------
      // make sure the function won't run after already closed
      // ----------------
    if(!switchFlag){
      closeTask(task)
      .then(data =>{
        if(data.msg === "ok"){//response from server => if succeeded
          
          // -------------------
          // dynamic status and urgency changes after close task
          // -------------------
          statusRef.current.innerHTML = "closed";
          setUrgency("");
          
          setSwitchFlag(true);// => change the switch flag to move the switch
          
          setDoneFlag(false);// => make sure to initiate the doneFlag again so it won't close any other task automatically without check => after we closed the first one
          
        }
      })
      .catch(error=>{
        console.error("Error adding document:\n", error);
      })
    }
  }
  // --------------------------------------
  // changes the urgency of that task on the firebase
  // --------------------------------------
  const changeUrgencyFetch=(_urgency)=>{
    changeUrgency(task, _urgency)
    .then(data =>{
      return;
    })
    .catch(error=>{
      console.error("Error adding document:\n", error);
    })
  }
  const deleteTaskFetch=()=>{
    deleteTask(task)
    .then(data=>{
      if(data.msg === "ok"){
        setDeleted(false);
        setFlag(!flag);
      }
    })
    .catch(error=>{
      console.error("Error adding document:\n", error);
    })

  }

  // --------------------------------------
  // open pop ups according to which action requested => close || edit || delete
  // --------------------------------------
  const openClosePopup=()=>{
    if(switchFlag || task.task_status === "closed"){
      return;
    }
    setCloseFlag(true);// return the makeSure-popup =>(at allTasks.jsx)
    const popupPos = document.scrollingElement.scrollTop+(window.innerHeight*0.5)-175;
    setPopupPosition(popupPos);
    setSelectedTask(inx);// catch that selected task 
  }
  const openEditPopup = ()=>{
    setEditFlag(true);
    const popupPos = document.scrollingElement.scrollTop+(window.innerHeight*0.5)-175;
    setPopupPosition(popupPos);
    setSelectedTask(inx);
    setCurrentTask(task);
  }
  const openDeletePopup=()=>{
    setDeleteFlag(true);
    const popupPos = document.scrollingElement.scrollTop+(window.innerHeight*0.5)-175;
    setPopupPosition(popupPos);
    setSelectedTask(inx);  
  }
  
  return (
    <div ref={taskCompRef} className='task_component'>
        <div className='task_container'>
          <div ref={editRef} className="task_editBtn" onClick={()=>{openEditPopup()}}></div>
          <div ref={deleteRef} className="task_deleteBtn" onClick={()=>{openDeletePopup()}}></div>
          <Switch moveSwitch={openClosePopup} switchDivRef={switchDivRef} switchCircleRef={switchCircleRef} switchSwitchRef={switchSwitchRef}/>
          <div ref={subjectRef} className='task_subject' onClick={()=>{setDetailsFlag(!detailsFlag)}}>
            {task.subject}
          </div>
          <TaskDetails detailsRef={detailsRef} urgencyRef={urgencyRef} setUrgencyFlag={setUrgencyFlag} urgencyFlag={urgencyFlag} setSelectedTask={setSelectedTask} setUrgency={setUrgency} inx={inx} task={task} statusRef={statusRef}/>
        </div>
        {detailsFlag && <div className="task_description_dropDown">
          {task.task_desc}
        </div>}
    </div>
  )
}
