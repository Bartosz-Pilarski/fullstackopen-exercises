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

interface RadioComponentProps<T> {
  name: string,
  values: T[],
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
}


const RadioComponent = <T,>(props: RadioComponentProps<T>) => {

  return <div>
    <b> Visibility: </b>
    {props.values.map((value, index) => (
      <label key={props.name + '-' + index}>
        <input type='radio' onChange={() => props.setState(value)} value={`${value}`} checked={props.state === value} name={props.name} />
        {`${value}`}
      </label>
    ))}
  </div>
}

interface DiaryFormProps {
  diaries: Diary[]
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>
}

export const DiaryForm = (props: DiaryFormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const errorStyle = { color: 'red' };

  const date = useInput('date');
  const visibilityValues = Object.values(Visibility)
  const [visibility, setVisibility] = useState(visibilityValues[0])
  const weatherValues = Object.values(Weather)
  const [weather, setWeather] = useState(weatherValues[0]);
  const comment = useInput('text');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNewDiary({date: date.value, visibility, weather, comment: comment.value})
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
      <input type={date.type} onChange={date.onChange} placeholder="12-12-2012" name="date" /> <br />

      <RadioComponent name="visibility" values={Object.values(Visibility)} state={visibility} setState={setVisibility} />
      <RadioComponent name="weather" values={Object.values(Weather)} state={weather} setState={setWeather} />
      
      <input type={comment.type} onChange={comment.onChange} placeholder="been great" name="comment" />
      <button type="submit"> Submit </button>
    </form>
  )
}