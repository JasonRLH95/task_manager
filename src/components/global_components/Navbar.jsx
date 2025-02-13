import React from 'react';
import '../../style/navbar.css';
import NavBtn from './NavBtn';

export default function Navbar({ display, setDisplay }) {


  // --------------------------------------
  // deploy buttons at Navbar component according to buttons array
  // --------------------------------------
    const buttons = ["All Tasks","New Task","History"];
    const deployButtons=()=>{
        return buttons.map((button,inx)=>{
            return <NavBtn key={`navBtn_${inx}`} inx={inx} button={button} display={display} setDisplay={setDisplay}/>
        });
    }
  return (
    <div className='navbar_container'>
        {deployButtons()}
    </div>
  )
}
