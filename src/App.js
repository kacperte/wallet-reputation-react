import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import { useState } from 'react';


export default function App() {
  const [darkMode, setDarkMode] = useState(false)
    
  function toggleDarkMode() {
        setDarkMode(prevMode => !prevMode)
    }

  return (
    <main>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <Main darkMode={darkMode}/>
    </main>
  );
}
