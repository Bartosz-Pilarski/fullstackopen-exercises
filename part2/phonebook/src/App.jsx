import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    //find the first element with the same name. true if exists.
    if(persons.find((person) => person.name === newName ) !== undefined) return alert(`${newName} is already a contact!`)

    setPersons(persons.concat({name: newName}))
  }

  const handleNewNameChange = (event) => { setNewName(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Ahoy! {persons.map((person) => (<p key={person.name}> {person.name} </p>))}</div>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App