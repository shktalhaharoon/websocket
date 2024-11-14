const express =require('express')

const {
    createWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout,
    loading,
    search,
    getWorkouts
}=require('../controllers/workoutController')
const router = express.Router()
//loading state 
router.get('/loading',loading)

router.get('/search',search)



//GET all workouts
router.get('/',getWorkouts)

//GET single workout
router.get('/:id',getWorkout)

//POST a new workout
router.post('/',createWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)

//UPDATE a workout
router.patch('/:id',updateWorkout)

module.exports =router