import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function CreateExercisePage() {

  const history = useHistory();

  // Variables which are initialized to empty string and updated by form below
  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  //----------------------------------------------------------------------------
  // Make a POST request to create a new exercise
  //----------------------------------------------------------------------------
  const addExercise = async () => {
    // Create new object with the variables set in the form
    const newExercise = {name, reps, weight, unit, date};

    try {
      const response = await fetch('/exercises', {
        method: 'POST',
        body: JSON.stringify(newExercise),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while making the request. Check the console for more details.");
    }
    // return to the homepage
    history.push('/');
  }

  const formattedDate = moment().format('MM-D-YYYY');

  return (
    <div>
      <h1>Create an Exercise</h1>

        <fieldset>

          <label for="name">Exercise Name</label> 
          <input id="name"
            type="text"
            placeholder="Squat"
            value={name}
            onChange={e => setName(e.target.value)}
          /> <br/>

          <label for="reps">Reps</label> 
          <input id="reps"
            type="number"
            min="0"
            placeholder="10"
            value={reps}
            onChange={e => setReps(e.target.value)}
          /> <br/>

          <label for="weight">Weight</label> 
          <input id="weight"
            type="number"
            min="0"
            placeholder="200"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          /> <br/>

          <label for="unit">Unit</label> 
          <input id="unit"
            type="text"
            placeholder="lb or kg"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          /> <br/>


          <label for="date">Date</label> 
          <input id="date"
            type="text"
            placeholder={formattedDate}
            value={date}
            onChange={e => setDate(e.target.value)}
          /> <br/>

          <button onClick={addExercise}> Create </button>

        </fieldset>

    </div>
  )

}

export default CreateExercisePage;
