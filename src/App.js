import {useState, useEffect, useRef, useLayoutEffect} from "react";
import { auth } from './firebase/connections';
import { onAuthStateChanged, signOut } from "firebase/auth";
import './App.css';
import TaskManager from './components/main_pages/TaskManager';
import Switch from "./components/global_components/Switch";

function App() {
  const [connected,setConncted] = useState(() => {
    const connection = localStorage.getItem("connected");
    return connection ? JSON.parse(connection) : false;
  });// => connection flag
  const [currentUser,setCurrentUser] = useState(() => {
    const current = localStorage.getItem("currentUser");
    return current ? JSON.parse(current) : null;
  });//=> when sign in, catch the userID
  const [tasks,setTasks] = useState(() => {
    const tasksArr = localStorage.getItem("tasks");
    console.log(tasksArr);
    return tasksArr ? JSON.parse(tasksArr) : [];
  });// => user's tasks array according to userID
  

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );
  const switchDivRef = useRef();
  const switchCircleRef = useRef();
  const switchSwitchRef = useRef();

  // ------------------------
  // handle the connection status 
  // when page refresh - if user
  // connected, he stays connected
  // until logout
  // ------------------------
  useLayoutEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(storedUser);
    if (storedUser && storedUser.userID) {
      // Verify Firebase authentication session
      onAuthStateChanged(auth, (user) => {
        if (user && user.uid === storedUser.userID) {
          setCurrentUser(storedUser.userID);
          setTasks(storedUser.tasks);
          setConncted(true);
        } else {
          handleLogout(); // If user is not authenticated anymore, log them out
        }
      });
    }
  },[])

  useEffect(() => {
    if(darkMode !== null && darkMode !== undefined){
      return renderDMSVisibility();// => change the dark mode switch visibility
    }
  }, [darkMode]);
  useEffect(()=>{
    localStorage.setItem("connected", JSON.stringify(connected));
  },[connected])
  useEffect(()=>{
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  },[currentUser])
  useEffect(()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },[tasks])
  
// --------------------------
// handle the logout to make sure
// the account signed out when
// press logout
// --------------------------
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setTasks(null);
      setConncted(false);
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const changeDarkMode=()=>{
    setDarkMode(!darkMode);
  }

  const renderDMSVisibility =()=>{ // => DMS = Dark Mode Switch
    if(!switchCircleRef.current || !switchDivRef.current || !switchSwitchRef.current){
      return;
    }
    else if (darkMode) {
      switchDivRef.current.style.backgroundColor = "#301934";
      switchCircleRef.current.style.translate = "30px";
      switchSwitchRef.current.style.backgroundColor = "lightgrey";
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      switchDivRef.current.style.backgroundColor = "#87CEFA";
      switchCircleRef.current.style.translate = "0px";
      switchSwitchRef.current.style.backgroundColor = "white";
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  return (
    <div className="App">
      {!connected && <div className="darkMode_switch">
        <Switch moveSwitch={changeDarkMode} switchDivRef={switchDivRef} switchCircleRef={switchCircleRef} switchSwitchRef={switchSwitchRef}/>
      </div>}
      <TaskManager darkMode={darkMode} changeDarkMode={changeDarkMode} switchDivRef={switchDivRef} switchCircleRef={switchCircleRef} switchSwitchRef={switchSwitchRef} connected={connected} setConncted={setConncted} currentUser={currentUser} setCurrentUser={setCurrentUser} tasks={tasks} setTasks={setTasks} handleLogout={handleLogout} renderDMSVisibility={renderDMSVisibility}/>
    </div>
  );
}

export default App;
