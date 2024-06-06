interface ExerciseInput {
  target: number,
  days: number[]
}

const parseExerciseInput = (args: string[]): ExerciseInput => {
  if(args.length < 4) throw new Error('Too few arguments')
  
  const target = Number(args[2])
  const days = args.splice(3).map((day) => Number(day))

  return {
    target,
    days
  }
}

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

type Rating = 1 | 2 | 3;

const calculateAverage = (data: number[]): number => data.reduce((total, currentVal) => total+currentVal, 0)/data.length;

const calculateTrainingDays = (data: number[]): number => {
  let count = 0
  data.forEach(day => { if(day > 0) count++ });

  return count
}

const calculateRating = (average: number, target: number): RatingSet => {
  const threshold = target*0.75;

  if(average < threshold) return { rating: 1, ratingDesc: 'Poor showing, try harder!' }
  if(average < target) return { rating: 2, ratingDesc: 'Almost there, keep going!' }
  return { rating: 3, ratingDesc: 'Well done.' }
}

const calculateExercises = (exerciseDays: number[], target: number): ExerciseData => {
  let averageVal: number = calculateAverage(exerciseDays);
  let ratingSet: RatingSet = calculateRating(averageVal, target);
  
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

try {
  const inputs: ExerciseInput = parseExerciseInput(process.argv);
  console.log(calculateExercises(inputs.days, inputs.target));
} catch (error: unknown) {
  let msg = 'Mayday: ';
  if(error instanceof Error) msg += error.message;
  console.log(msg);
}

