const Workout = require('../models/workoutModel')
const mongoose=require('mongoose')


//get all workout
const getWorkouts = async (req,res) =>{
    const workouts=await Workout.find({}).sort({createAt: -1})
    res.status(200).json(workouts)
}





//get a single workout
const getWorkout = async(req,res) =>{
    const {id}=req.params
if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such workout'})
}
    const workout =await Workout.findById(id)

    if(!workout)
    {
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}





//create a new workout
const createWorkout =async(req,res)=> {
    const{title,load,reps}=req.body
    let emptyFields = []

    if (!title) {
      emptyFields.push('title')
    }
    if (!load) {
      emptyFields.push('load')
    }
    if (!reps) {
      emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }








//add doc to db
    try{
const workout = await Workout.create({title,load,reps})
res.status(200).json(workout)
    }catch(error)
    {
res.status(400).json({error:error.message})
    }
}





//delete a workout
const deleteWorkout=async (req,res)=>{
    const {id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workout'})
    }
    const workout=await Workout.findOneAndDelete({_id: id})
    if(!workout)
        {
            return res.status(400).json({error:'No such workout'})
        }
        res.status(200).json(workout)

}





//update a workout
const updateWorkout=async (req,res)=>{
    const {id }=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'No such workout'})
    }
const workout= await Workout.findOneAndUpdate({_id:id},
    { ...req.body})
    if(!workout)
        {
            return res.status(400).json({error:'No such workout'})
        }
        res.status(200).json(workout)

}


// Get all workouts with pagination
const loading = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 3; // Default to 3 records per page if not provided
        const skip = (page - 1) * limit; // Calculate how many records to skip

        // Fetch workouts with pagination and sort by createdAt in descending order
        const workouts = await Workout.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalWorkouts = await Workout.countDocuments();

        res.status(200).json({
            workouts, // List of workouts for the current page
            total: totalWorkouts, // Total number of workouts in the database
            hasMore: skip + limit < totalWorkouts, // Boolean indicating if there are more records
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
};


// searching

// API Route to search workouts by title
const search = async (req, res) => {
  const searchTerm = req.query.q; // Get the search term from the query string

  try {
    // Perform a case-insensitive search on the 'title' field using regex
    const workouts = await Workout.find({
      title: { $regex: searchTerm, $options: 'i' }, // Search in 'title' field, case-insensitive
    });

    res.json(workouts); // Send back the search results
  } catch (error) {
    res.status(500).json({ error: 'Failed to search workouts' });
  }
};






module.exports={
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
    loading,
    search,
    createWorkout
}