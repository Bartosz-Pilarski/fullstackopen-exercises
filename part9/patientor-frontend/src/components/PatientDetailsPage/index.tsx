import { useEffect, useState } from "react";
import patients from "../../services/patients";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";

const PatientDetailsPage = () => {
  const { id } = useParams();

  const [patientInfo, setPatientInfo] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    if(id && typeof id === 'string') patients.getById(id).then((data) => setPatientInfo(data));
  }, []);

  if(patientInfo) return <div>
    <b>Name: </b> {patientInfo.name} <br/>
    <b>SSN: </b> {patientInfo.ssn} <br/>
    <b>Gender: </b> {patientInfo.gender} <b>Date of birth: </b> {patientInfo.dateOfBirth} <b>Occupation: </b> {patientInfo.occupation}
  </div>;

  return <div>
    Patient not found
  </div>;
};

export default PatientDetailsPage;