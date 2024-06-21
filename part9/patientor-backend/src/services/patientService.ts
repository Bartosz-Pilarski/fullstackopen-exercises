import patientsData from '../../data/patients';

import { NewPatient, NonSensitivePatientInfo, Patient } from '../types.js';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientById = (id: string) => {
  return patients.find((patient) => patient.id === id);
};

const getNonSensitivePatientById = (id: string): NonSensitivePatientInfo | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if(patient) {
    const returnValue: NonSensitivePatientInfo = {
      id: patient.id, 
      name: patient.name, 
      dateOfBirth: patient.dateOfBirth, 
      gender: patient.gender, 
      occupation: patient.occupation
    };
    
    return returnValue;
  } 
  return undefined;
};

const getNonSensitivePatients = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuidv4();
  const newPatient = {
    id,
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientById,
  getNonSensitivePatients,
  getNonSensitivePatientById,
  addPatient
};