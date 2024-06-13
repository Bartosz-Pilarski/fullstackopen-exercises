import { useState } from "react"
import { createNewDiary } from "./diaryService"
import { useInput } from "./hooks"
import { Diary, Visibility, Weather } from "./types"

export const DiaryEntry = (props: Diary): JSX.Element => {
  const style = {
    border: '2px solid black',
    margin: '15px',
    padding: '5px',
    display: 'inline-block'
  }
  return (
    <div style={style}>
      <h2> {props.date} </h2>
      <p> <b> Visibility: </b> {props.visibility} </p>
      <p> <b> Weather: </b> {props.weather} </p>
    </div>
  )
}

interface DiaryFormProps {
  diaries: Diary[]
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

export const DiaryForm = (props: DiaryFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const errorStyle = { color: 'red' };

  const date = useInput('text');
  const visibility = useInput('text');
  const weather = useInput('text');
  const comment = useInput('text');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNewDiary({date: date.value, visibility: visibility.value as Visibility, weather: weather.value as Weather, comment: comment.value})
    .then((res) => { 
      if(res !instanceof Error) setErrorMessage(res.message);
      else {
        props.setDiaries(props.diaries.concat(res));
        setErrorMessage('');
      }
    })
    .catch((err) => {
      if(err instanceof Error) setErrorMessage(err.message);
    })

  }

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage !== '' ? <span style={errorStyle}> <b> Error: </b>  {errorMessage} <br /> </span> : <></>}
      <input type={date.type} onChange={date.onChange} placeholder="12-12-2012" name="date" />
      <input type={visibility.type} onChange={visibility.onChange} placeholder="good" name="visibility" />
      <input type={weather.type} onChange={weather.onChange} placeholder="sunny" name="weather" />
      <input type={comment.type} onChange={comment.onChange} placeholder="been great" name="comment" />
      <button type="submit"> Submit </button>
    </form>
  )
}