import { useEffect, useState } from "react"
import { getAllDiaries } from "./diaryService"
import { Diary } from "./types"
import { DiaryEntry, DiaryForm } from "./DiaryComponents"

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

 
  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, [])

  return (
    <div>
      <h1> Ilari's Flight Diaries </h1>
      <div>
        <h2> Add a new diary</h2>
        <DiaryForm diaries={diaries} setDiaries={setDiaries} />
      </div>
      <div>
        <h2> Diaries </h2>
        {diaries.map((diary) => <DiaryEntry key={diary.id} {...diary} />)}
      </div>
    </div>
  )
}

export default App