import './App.css';
import HomePage from './pages/HomePage.js'
import CreateExercisePage from './pages/CreateExercisePage.js'
import EditExercisePage from './pages/EditExercisePage.js'
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Full Stack MERN App</p>
      </header>
      <Router>
        <Navigation /> 
 
          <Route path='/' exact>
            <HomePage setExerciseToEdit={setExerciseToEdit}/> 
          </Route>

          <Route path='/create'>
            <CreateExercisePage/>
          </Route>

          <Route path='/edit'>
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
      </Router>
      <footer>
        <p>© Copyright 2023 Su Youn Jeon</p>
      </footer>
    </div>
  );
}

export default App;
