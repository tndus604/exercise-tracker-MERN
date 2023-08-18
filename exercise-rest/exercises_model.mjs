import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, enum: ['kgs', 'lbs'], required: true },
    date: { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);



const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class User
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date });
    // Call save to persist this object as a document in MongoDB

    return exercise.save();
}

const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query
}

const findExercises = async (filter) => {
    // Use the 'find' method to retrieve users based on the query
    const query = Exercise.find(filter);
    return query.exec();
}

const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const updatedExercise = await Exercise.findByIdAndUpdate(
        _id,
        { name, reps, weight, unit, date },
        { new: true } // This option returns the updated document instead of the old one.
    );

    if (updatedExercise) {
        return 1; 
    } else {
        return 0; 
    }
}

const updateExercise = async (_id, update) => {
    return Exercise.updateOne({ _id }, update).exec();
};

const deleteById = async (_id) => {
    // Use the 'deleteOne' method to delete the exercise with the specified _id
    const result = await Exercise.deleteOne({ _id }).exec();
    return result.deletedCount;
};


export { createExercise, findExerciseById, findExercises, replaceExercise, updateExercise, deleteById }

