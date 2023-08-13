import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import EditExercise from './pages/EditExercise';
import CreateExercise from './pages/CreateExercise';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/edit" element={ <EditExercise />}></Route>
            <Route path="/create" element={ <CreateExercise />}></Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
