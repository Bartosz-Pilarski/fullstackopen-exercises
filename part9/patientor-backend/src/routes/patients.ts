import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  console.log(req.body);
  try {
    const newPatient = toNewPatient(req.body);
    const savedPatient = patientService.addPatient(newPatient);

    res.status(200).json(savedPatient);
  } catch (error: unknown) {
    let errorMessage = "Mayday: ";
    if(error instanceof Error) errorMessage += error.message;
    res.status(400).json(errorMessage);
  }
});

export default router;