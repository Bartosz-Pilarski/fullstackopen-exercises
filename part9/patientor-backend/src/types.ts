export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other"
} 

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface Entry {

}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type NonSensitivePatientInfo = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;