import React, { useEffect, useRef } from 'react';
import '../style/loading.css';
import LoadingTask from './LoadingTask';

export default function Loading({ loading, tasks }) {

    const demoTasks = ["","",""];
    
    const loadingRef = useRef(null);

    // ----------------------------
    // dots movement effect when loading
    // ----------------------------
    useEffect(() => {
      const loadingText = ["",".","..","..."];
      let index = 0;
      if(loading){
        const interval = setInterval(() => {
          if (loadingRef.current) {
            loadingRef.current.innerHTML = loadingText[index];
            index = (index + 1) %loadingText.length;
          }
        }, 300);

        return () => clearInterval(interval);
      }

    }, [loading, tasks]);

    // -------------------------------
    // deploy the demo tasks when loading
    // -------------------------------
    const deployDemoTasks = ()=>{
      return demoTasks.map((task, inx)=>{
        return <LoadingTask key={`${task.id}_${inx}`}/>
      })
    }

  return (
    <div className='loading_component'>
        <div className="loading_header">Loading<span ref={loadingRef}></span></div>
        {deployDemoTasks()}
    </div>
  )
}
