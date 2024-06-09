import express from 'express';
import cors from 'cors';
import diagnoses from './routes/diagnoses';
import patients from './routes/patients';
const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors());
app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});