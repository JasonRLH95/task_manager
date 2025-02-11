import React,{ useEffect, useState } from 'react';
import '../style/history.css';
import TaskHistory from './TaskHistory';
import { getHistory } from '../firebase/connections';
import Loading from './Loading';

export default function History({ loading, setLoading, flag, setFlag, tasks, setTasks, currentUser }) {

  const [searchTerm,setSearchTerm] = useState("");
  
  // --------------------------------------
  // fetch all closed tasks and save it on client page
  // so we could deploy Task component forEach doc
  // --------------------------------------
  useEffect(()=>{
    const fetchData=()=>{
      setTasks([]);
      setLoading(true);
      try{
        setTimeout(()=>{
          getHistory(currentUser)
          .then((data)=>{
            setTasks(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error adding document:\n", error);
          })
        },500)
      }
      catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[flag])

  // --------------------------------------
  // deploy tasks at client's page
  // --------------------------------------
  const mapTasksList=(list)=>{
    return list.map((task, inx)=>{
      return <TaskHistory key={`historyTask_${inx}`} task={task} tasks={tasks} inx={inx} setFlag={setFlag} flag={flag}/>
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
    <div className='history_component'>
      {loading && <Loading loading={loading} tasks={tasks}/>}
      {!loading && 
      <>
        <div className='history_top_section'>
          <h1 className='history_header'>History</h1>
          <div className="history_searchDiv">
            <input type="text" placeholder='Search...' className='history_searchInput' onChange={(e)=>{setSearchTerm(e.target.value)}}/>
          </div>
        </div>
        <div className="history_container">
          {deployTasks()}
        </div>
      </>}
    </div>
  )
}
