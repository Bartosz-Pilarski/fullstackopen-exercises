import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitivePatients());
});

router.post('/', (_req, res) => {
  res.send('Saving patient info!');
});

export default router;