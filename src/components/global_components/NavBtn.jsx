import React, { useEffect, useRef } from 'react';
import '../../style/navBtn.css';

export default function NavBtn({ inx, button, display, setDisplay }) {

  const refer = useRef();
  
  // ----------------------------------
  // render visibility of the Navbar buttons according to which of them selected
  // ----------------------------------
  useEffect(()=>{
    if(inx === display){
        refer.current.setAttribute("class","navBtn_active")
    }
    else{
        refer.current.setAttribute("class","navBtn")
    }
  },[display])

  return (
    <button ref={refer} className='navBtn' onClick={()=>{setDisplay(inx)}}>{button}</button>
  )
}
