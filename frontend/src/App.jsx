import { useState } from "react";
import "./App.css";
import Login from "./Login";
import Tasks from './Tasks'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const handleLogin = async (username) => {
    localStorage.setItem('username', username);
    setUsername(username);
   }
  const handleLogout= async() =>{
    localStorage.removeItem('username');
    setUsername(null);

  }


  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={username ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />} />
        <Route path="/tasks" element={<Tasks username={username} onLogout={handleLogout} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
