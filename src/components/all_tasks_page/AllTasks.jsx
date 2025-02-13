import React, { useEffect, useState } from 'react';
import { getTasks } from '../../firebase/connections';
import '../../style/allTasks.css'
import Task from './Task';
import PopupAtClose from '../popups/PopupAtClose';
import Loading from '../global_components/Loading';
import PopupAtEdit from '../popups/PopupAtEdit';
import PopupAtDelete from '../popups/PopupAtDelete';

export default function AllTasks({ darkMode, loading, setLoading, flag, setFlag, tasks, setTasks, currentUser, connected, renderDMSVisibility }) {
  
  const [selectedTask,setSelectedTask] = useState(null); // => catch the task index selected when change urgency || close || delete
  const [currentTask, setCurrentTask] = useState(null); // => catch the task selected for the edit, holds the current task information
  const [closeFlag,setCloseFlag] = useState(false); // => flag for the popup to appear
  const [editFlag,setEditFlag] = useState(false); // => flag for the popup to appear
  const [deleteFlag,setDeleteFlag] = useState(false); // => flag for the popup to appear
  const [deleted,setDeleted] = useState(false); // => flag for the task to be deleted
  const [doneFlag,setDoneFlag] = useState(false); // => flag for the task to declare as done
  const [popupPosition,setPopupPosition] = useState(null); // => catch the scrolling position for the popup
  const [filter,setFilter] = useState("Open"); // => rendering the search filter selected
  const [searchTerm,setSearchTerm] = useState(""); // => rendering the search term typed

  
  // --------------------------------------
  // according to the filterFlag => fetch all tasks and save it on client page
  // so we could deploy Task component forEach doc
  // --------------------------------------
  useEffect(()=>{
    renderDMSVisibility();
    const fetchData=()=>{
        setTasks([]);
        setLoading(true);
        try{
          setTimeout(() => {
            getTasks(filter, currentUser)
            .then((data)=>{
              setTasks(data);
              setLoading(false);
            })
            .catch((error) => {
              console.error("Error adding document:\n", error);
            })  
          }, 500);
        }
        catch(err){
          console.log(err);
        }
    }
    fetchData();
  },[flag, filter, connected])


  // --------------------------------------
  // deploy tasks at client's page
  // --------------------------------------
  const mapTasksList=(list)=>{
    return list.map((task, inx) =>{
      return <Task key={`task_${task.id}`} darkMode={darkMode} flag={flag} setFlag={setFlag} selectedTask={selectedTask} setSelectedTask={setSelectedTask} task={task} tasks={list} inx={inx} setCloseFlag={setCloseFlag} setEditFlag={setEditFlag} setDeleteFlag={setDeleteFlag} deleted={deleted} setDeleted={setDeleted} doneFlag={doneFlag} setDoneFlag={setDoneFlag} setPopupPosition={setPopupPosition} setCurrentTask={setCurrentTask}/>
    })
  }
  const deployTasks = ()=>{
    if(tasks === null || tasks.length === 0){
      return <h2>Empty...</h2>
    }
    else if(tasks !== null){
      if(searchTerm !== ""){
        const filtered = tasks.filter(task=>{
          return task.subject.toLowerCase().includes(searchTerm.toLowerCase()) || task.task_owner.toLowerCase().includes(searchTerm.toLowerCase())
        })
        return mapTasksList(filtered);
      }
      return mapTasksList(tasks);
    }
  }

  return (
    <div className='allTasks_component'>

      {loading && <Loading loading={loading} tasks={tasks}/>}
      {!loading && 
      <>
        <div className='allTasks_topSection'>
          <h1 className='allTasks_header'>All Tasks</h1>
          <div className="allTasks_searchDiv">
            <input type="text" placeholder='Search...' className='allTasks_searchInput' onChange={(e)=>{setSearchTerm(e.target.value)}}/>
          </div>
          <div className='allTasks_filter'>
            <label style={{cursor:"text"}}>Order by: </label>
            <select className='allTasks_select' defaultValue={"Choose filter"} onChange={(e)=>{setFilter(e.target.value);setFlag(!flag)}}>
              <option value="Choose filter" disabled hidden>Choose filter</option>
              <option value="Closed">Closed</option>
              <option value="Open">Open</option>
              <option value="Newer">Newer</option>
              <option value="Nearest Time">Nearest Time</option>
            </select>
          </div>
        </div>
        <div className="allTasks_container">
          {deployTasks()}
        </div>
      </>}
      {closeFlag && <PopupAtClose setSelectedTask={setSelectedTask} setCloseFlag={setCloseFlag} setDoneFlag={setDoneFlag} popupPosition={popupPosition}/>}
      {editFlag && <PopupAtEdit setSelectedTask={setSelectedTask} setEditFlag={setEditFlag} popupPosition={popupPosition} setCurrentTask={setCurrentTask} task={currentTask} flag={flag} setFlag={setFlag} currentUser={currentUser}/>}
      {deleteFlag && <PopupAtDelete setSelectedTask={setSelectedTask} setDeleteFlag={setDeleteFlag} popupPosition={popupPosition} setDeleted={setDeleted}/>}
    </div>
  )
}
