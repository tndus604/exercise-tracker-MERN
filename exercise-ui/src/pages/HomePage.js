import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

function HomePage({ setExerciseToEdit }) {
  
  const history = useHistory();

  const [exercises, setExercises] = useState([]);


  const loadExercises = async () => {
    try {
      const response = await fetch('/exercises');
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  }
  useEffect(() =>  loadExercises(), []);

  const onEdit = exercise => {
    setExerciseToEdit(exercise);
    history.push('/edit');
  };


  const onDelete = async (_id) => {
    // Confimation
    const confirmation = window.confirm("Are you sure you want to delete this exercise?");
    if (!confirmation){
      console.log('Deletion canceled')
      return
    }

    const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
    if (response.ok) {
      setExercises(exercises.filter(e => e._id !== _id));
      console.log(`Exercise with _id ${_id} deleted successfully`);
    } else {
      console.error(`Failed to delete exercise with _id ${_id} with status code = ${response.status}`)
    }
    history.push('/')
  };

  return (
    <>

      <ExerciseTable exercises={exercises} onEdit={onEdit} onDelete={onDelete}/>

      <br/>
      <Link to='/create'><button className='create-button'>Create an Exercise</button></Link>
    </>
  )
}

export default HomePage;
