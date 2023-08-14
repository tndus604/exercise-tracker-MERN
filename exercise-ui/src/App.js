import './App.css';
import HomePage from './pages/HomePage.js'
import CreateExercisePage from './pages/CreateExercisePage.js'
import EditExercisePage from './pages/EditExercisePage.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useState } from 'react';

function App() {

  // exerciseToEdit is an object whose keys correspond to the header values in
  // the table. The object is populated with the current row from the home page
  // and is used in the EditExercisePage to update the database and virtual DOM.
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>

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
    </div>
  );
}

export default App;
