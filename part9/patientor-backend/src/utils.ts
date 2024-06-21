import { Gender, NewPatient } from "./types";

const isString = (param: unknown): param is string => typeof param === "string" || param instanceof String;
const isDate = (param: string): boolean => Boolean(Date.parse(param));
const isGender = (param: string): param is Gender => Object.values(Gender).map(gender => gender.toString()).includes(param);

const parseString = (text: unknown): string => { 
  if(!isString(text) || text === "") throw new Error("Invalid or missing text field: " + text);
  return text;
};
const parseDate = (date: unknown): string => {
  if(!isString(date) || !isDate(date)) throw new Error("Invalid or missing date field: " + date);
  return date;
};
const parseGender = (gender: unknown): Gender => {
  if(!isString(gender) || !isGender(gender)) throw new Error("Invalid or missing gender field: " + gender);
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if(!object || typeof object !== "object") throw new Error("Invalid or missing data");
  
  if("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: []
    };

    return newPatient;
  }
  throw new Error("Missing fields");
};