import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';
import moment from 'moment';

const PORT = process.env.PORT;

const app = express();


app.use(express.json());

function validateDate(date) {
    return moment(date, 'MM-DD-YY', true).isValid();
}

app.post('/exercises', (req, res) => {
    const { name, reps, weight, unit, date } = req.body;

    // Check if all required fields are provided
    if (!name || !reps || !weight || !unit || !date) {
        res.status(400).json({ Error: 'All fields are required' });
        return;
    }

    // Validate the date format
    if (!validateDate(date)) {
        res.status(400).json({ Error: 'Invalid date format. Use MM-DD-YY' });
        return;
    }

    if (!Number.isInteger(reps) && reps <= 0) {
        res.status(400).json({ Error: 'The reps property must be an integer greater than 0.' });
        return;
    }

    if (!Number.isInteger(weight) && weight <= 0) {
        res.status(400).json({ Error: 'The weight property must be an integer greater than 0.' });
        return;
    }

    if (unit !== 'lbs' && unit !== 'kgs') {
        res.status(400).json({ Error: 'The unit property must be either the string kgs or the string lbs.' });
        return;
    }

    // Create exercise
    exercises.createExercise(name, reps, weight, unit, date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'An error occurred while creating the exercise' });
        });
});


app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request failed' });
        });

});


app.get('/exercises', (req, res) => {
    let filter = {};
    // Is there a query parameter named year? If so add a filter based on its value.
    if(req.query.year !== undefined){
        filter = { year: req.query.year };
    }
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.status(200).send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });

});


app.put('/exercises/:_id', (req, res) => {
    // Check if all required fields are provided
    if (!req.body.name || !req.body.reps || !req.body.weight || !req.body.unit || !req.body.date) {
        res.status(400).json({ Error: 'All fields are required' });
        return;
    }

    if (!validateDate(req.body.date)) {
        res.status(400).json({ Error: 'Invalid date format. Use MM-DD-YY' });
        return;
    }

    if (!Number.isInteger(req.body.reps) && req.body.reps <= 0) {
        res.status(400).json({ Error: 'The reps property must be an integer greater than 0.' });
        return;
    }

    if (!Number.isInteger(req.body.weight) && req.body.weight <= 0) {
        res.status(400).json({ Error: 'The weight property must be an integer greater than 0.' });
        return;
    }

    if (req.body.unit !== 'lbs' && req.body.unit !== 'kgs') {
        res.status(400).json({ Error: 'The unit property must be either the string kgs or the string lbs.' });
        return;
    }

    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Request failed' });
        });
});


app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});