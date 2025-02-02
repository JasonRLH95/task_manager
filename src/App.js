import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import DisplayPage from './components/DisplayPage';
import News from './components/News';

function App() {
  const [display,setDisplay] = useState(0);
  return (
    <div className="App">
      <News/>
      <Navbar display={display} setDisplay={setDisplay}/>
      <DisplayPage display={display}/>
    </div>
  );
}

export default App;
