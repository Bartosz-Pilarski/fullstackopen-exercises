interface ExerciseData {
  periodLength: number,
  trainingDays: number,

  average: number,

  target: number,
  targetMet: boolean,

  rating: Rating,
  ratingDesc: string
}

interface RatingSet {
  rating: Rating,
  ratingDesc: string
}

type Rating = 1 | 2 | 3

const calculateAverage = (data: number[]): number => data.reduce((total, currentVal) => total+currentVal, 0)/data.length

const calculateTrainingDays = (data: number[]): number => {
  let count = 0
  data.forEach(day => { if(day > 0) count++ })

  return count
}

const calculateRating = (average: number, target: number): RatingSet => {
  const threshold = target*0.75

  if(average < threshold) return { rating: 1, ratingDesc: 'Poor showing, try harder!' }
  if(average < target) return { rating: 2, ratingDesc: 'Almost there, keep going!' }
  return { rating: 3, ratingDesc: 'Well done.' }
}

const calculateExercises = (exerciseDays: number[], target: number): ExerciseData => {
  let averageVal: number = calculateAverage(exerciseDays)
  let ratingSet: RatingSet = calculateRating(averageVal, target)
  
  return {
    periodLength: exerciseDays.length,
    trainingDays: calculateTrainingDays(exerciseDays),
    
    average: averageVal,

    target,
    targetMet: averageVal >= target,
    
    rating: ratingSet.rating,
    ratingDesc: ratingSet.ratingDesc
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))