import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    //find the first element with the same name. true if exists.
    if(persons.find((person) => person.name === newName ) !== undefined) return alert(`${newName} is already a contact!`)

    setPersons(persons.concat({name: newName, number: newNumber, id:(persons.length+1)}))
  }

  const handleNewNameChange = (event) => { setNewName(event.target.value) }
  const handleNewNumberChange = (event) => { setNewNumber(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Ahoy! {persons.map((person) => (<p key={person.id}> {person.name} <br/> {person.number} </p>))}</div>
      <form onSubmit={handlePersonSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange}/>
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