import express from 'express';
const cors = require('cors');
const app = express();
app.use(express.json());

const PORT = 3001;

app.use(cors())

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});