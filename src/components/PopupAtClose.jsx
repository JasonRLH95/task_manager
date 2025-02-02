import React from 'react';
import '../style/popupAtClose.css';

export default function PopupAtClose({ setSelectedTask, setCloseFlag, setDoneFlag, popupPosition }) {
  // -------------------------------
  // when trying to close task, this is the popup message that
  // showing on the clients screen
  // -------------------------------
  return (
    <div className='close_makeSure_popup' style={{top:`${popupPosition}px`}}>
        <h1>Just to make sure..</h1>
        <h3>Did you finished with this task?...</h3>
        <h4>You won't be able to edit this task anymore</h4>
        <div>
          {/* if proceed - render the useEffect of the Task components */}
          <button onClick={()=>{setCloseFlag(false); setDoneFlag(true)}}>Yes</button>
          <button onClick={()=>{setCloseFlag(false); setDoneFlag(false); setSelectedTask(null)}}>No</button>
        </div>
      </div>
  )
}
