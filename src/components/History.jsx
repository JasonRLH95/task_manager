import React,{ useEffect } from 'react';
import '../style/history.css';
import TaskHistory from './TaskHistory';
import { getHistory } from '../firebase/connections';
import Loading from './Loading';

export default function History({ loading, setLoading, flag, tasks, setTasks}) {

  
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
          getHistory()
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
  const deployTasks = ()=>{
    if(tasks === null || tasks.length === 0){
      return <h2>Empty...</h2>
    }
    else if(tasks !== null){
      return tasks.map((task, inx) =>{
        return <TaskHistory task={task} tasks={tasks} inx={inx}/>
      })
    }
  }

  return (
    <div className='history_component'>
      {loading && <Loading loading={loading} tasks={tasks}/>}
      {!loading && 
      <>
        <div className='history_top_section'>
          <h1 className='history_header'>History</h1>
        </div>
        <div className="history_container">
          {deployTasks()}
        </div>
      </>}
    </div>
  )
}
