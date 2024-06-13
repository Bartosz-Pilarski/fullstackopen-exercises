import { Diary } from "./types"

const DiaryEntry = (props: Diary): JSX.Element => {
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

export default DiaryEntry