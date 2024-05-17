import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route  path="/taskbar" element={<TodoList/>} />
      </Routes>
    </Router>
  );
}

export default App;
