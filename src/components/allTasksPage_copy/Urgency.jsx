import React from 'react';
import "../../style/urgency_copy.css";

export default function Urgency({ setUrgency }) {
  return (
    <div className="urgencySelection">
        <div className="urgency_selectOption" id='urgency_selectLow' onClick={()=>{setUrgency("Low")}}></div>  
        <div className="urgency_selectOption" id='urgency_selectMedium' onClick={()=>{setUrgency("Medium")}}></div>  
        <div className="urgency_selectOption" id='urgency_selectHigh' onClick={()=>{setUrgency("High")}}></div>  
    </div>
  )
}
