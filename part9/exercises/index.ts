import express from 'express';
import calculateBmi from './bmiCalculator';
import { ExerciseData, calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  
  if(!height || !weight || isNaN(height) || isNaN(weight)) res.status(400).json({ error: 'Malformatted or missing parameters' });

  res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;
  if( !target || !daily_exercises ) return res.status(400).json({ error: 'Missing parameters'});
  
  const targetHours: number = Number(target);
  if( isNaN(targetHours) || !Array.isArray(daily_exercises)) return res.status(400).json({ error: 'Malformatted paramaters'});

  const dailyHours = daily_exercises.map((day) => Number(day));
  for (let day = 0; day < dailyHours.length; day++) {
    const element = dailyHours[day];
    if(isNaN(element)) return res.status(400).json({ error: 'Malformatted parameters' });
  }

  const result: ExerciseData = calculateExercises(dailyHours, targetHours);

  return res.status(200).json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});