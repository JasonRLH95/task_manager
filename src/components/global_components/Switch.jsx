import React from 'react';
import "../../style/switch.css";

export default function Switch({ moveSwitch, switchDivRef, switchCircleRef, switchSwitchRef}) {
    
  return (
    <div className='task_status'>
        <div ref={switchDivRef} className='task_status_switch_div'
        onClick={()=>{moveSwitch()}}>
            <div ref={switchCircleRef} className='task_status_switch_circle'>
            <div ref={switchSwitchRef} className="task_status_switch_switch"></div>
            </div>
        </div>
    </div>
  )
}
