import { useEffect, useState } from 'react';
import { Note } from './types';
import { createNote, getAllNotes } from './services/noteService';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'testing' }
  ]);
  const [newNote, setNewNote] = useState('');

  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createNote({ content: newNote }).then((data) => setNotes(notes.concat(data)))

    setNewNote('');
  }

  useEffect(() => {
    getAllNotes().then((data) => setNotes(data))

  }, [])

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(event) => setNewNote(event.target.value)} />
        <button type='submit'>add</button>
      </form>
      <ul>
        {notes.map(note => <li key={note.id}>{note.content}</li>)}
      </ul>
    </div>
  )
}

export default App