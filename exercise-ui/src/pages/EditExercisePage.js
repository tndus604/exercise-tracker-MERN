import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function EditExercisePage({ exerciseToEdit }) {

  const history = useHistory();

  const [name, setName] = useState(exerciseToEdit.name);
  const [reps, setReps] = useState(exerciseToEdit.reps);
  const [weight, setWeight] = useState(exerciseToEdit.weight);
  const [unit, setUnit] = useState(exerciseToEdit.unit);
  const [date, setDate] = useState(exerciseToEdit.date);

  const editExercise = async () => {
    const updatedExercise = {name, reps, weight, unit, date};

    const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedExercise),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 200) {
      alert("Successfully edited.");
    } else {
      alert(`Failed to edit exercise, status code = ${response.status}`);
    }
    history.push('/');
  }

  return (
    <div>
      <h2>Edit a Exercise</h2>

        <fieldset>
          <label for="name">Exercise Name</label> 
          <input id="name"
            type="text"
            placeholder="deadlift"
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
            placeholder="210"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          /> 
          <br/>

          <label for="unit">Unit</label> 
          <select id="unit" name="unit" value={unit} onChange={e => setUnit(e.target.value)}>
              <option value="" disabled selected hidden>Please Choose...</option>
              <option value="lbs" selected="selected">lbs</option>
              <option value="kgs">kgs</option>
          </select>
          <br/>

          <label for="date">Date</label> 
          <input id="date"
            type="text"
            placeholder="08-13-2023"
            value={date}
            onChange={e => setDate(e.target.value)}
          /> <br/>

          <button onClick={editExercise}> Save </button>

        </fieldset>

    </div>
  )

};

export default EditExercisePage;