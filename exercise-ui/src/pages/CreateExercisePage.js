import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

function CreateExercisePage() {

  const history = useHistory();

  const [name, setName] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('');
  const [date, setDate] = useState('');

  const addExercise = async () => {

    const newExercise = {name, reps, weight, unit, date};

    try {
      const proxyUrl = process.env.REACT_APP_PROXY;
      const response = await fetch(`${proxyUrl}/exercises`, {
        method: 'POST',
        body: JSON.stringify(newExercise),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert("Successfully added.");
      } else {
        throw new Error(`Failed to add exercise. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while making the request. Please type in valid input.");
    }

    history.push('/');
  }

  const formattedDate = moment().format('MM-DD-YY');

  return (
    <div>
      <h2>Create an Exercise</h2>

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
          <select id="unit" name="unit" value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="" disabled selected hidden>Please Choose...</option>
              <option value="lbs">lbs</option>
              <option value="kgs">kgs</option>
          </select>
          <br/>


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
