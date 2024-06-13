import axios from "axios"
import { Diary, NewDiary } from "./types"

const baseUrl = `http://localhost:3000/api/diaries`

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(res => res.data);
}

export const createNewDiary = (entry: NewDiary) => {
  return axios
    .post<Diary>(baseUrl, entry)
    .then(res => res.data);
}