import React from 'react';
import '../style/loadingTask.css';

export default function LoadingTask() {
  // -------------------------------
  // the shimmer effect set on the css as animation for the component
  // -------------------------------
  return (
    <div className='loadingTask_component'>
        <div className="loadingTask_details">
            <div className="loadingTask_details_section">f</div>
            <div className="loadingTask_details_section">f</div>
            <div className="loadingTask_details_section">f</div>
        </div>
        <div className="loadingTask_container">
            <div className="loadingTask_section">f</div>
            <div className="loadingTask_section">f</div>
            <div className="loadingTask_section">f</div>
        </div>
    </div>
  )
}
