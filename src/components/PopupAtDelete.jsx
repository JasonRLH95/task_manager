import React from 'react';
import "../style/popupAtDelete.css";

export default function PopupAtDelete({ setSelectedTask, setDeleteFlag, popupPosition, setDeleted }) {
  return (
    <div className='popupAtDelete_component' style={{top:`${popupPosition}px`}}>
        <h1>Just to make sure..</h1>
        <h3>Do you really wanna delete this task?...</h3>
        <h4>You could see that task at history page</h4>
        <div>
          {/* if proceed - render the useEffect of the Task components */}
          <button onClick={()=>{setDeleteFlag(false); setDeleted(true);}}>Yes</button>
          <button onClick={()=>{setDeleteFlag(false); setDeleted(false); setSelectedTask(null)}}>No</button>
        </div>
    </div>
  )
}
