import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  let height: number = Number(req.query.height);
  let weight: number = Number(req.query.weight);
  
  if(!height || !weight || isNaN(height) || isNaN(weight)) res.status(400).json({ error: 'Malformatted or missing parameters' });

  res.status(200).json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});