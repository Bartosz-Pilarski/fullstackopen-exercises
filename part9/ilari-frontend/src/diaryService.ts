import axios from "axios"
import { Diary, NewDiary } from "./types"

const baseUrl = `http://localhost:3000/api/diaries`

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(res => res.data);
}

export const createNewDiary = async (entry: NewDiary): Promise<Diary | Error> => {
  try {
    const res = await axios
      .post<Diary>(baseUrl, entry);
    return res.data;
  } catch (err) {
    if(axios.isAxiosError(err)) return new Error(err.response?.data);
  }
  return new Error('Something went wrong');
}