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
  const [searchInput, setSearchInput] = useState('')

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    //find the first element with the same name. true if exists.
    if(persons.find((person) => person.name === newName ) !== undefined) return alert(`${newName} is already a contact!`)

    setPersons(persons.concat({name: newName, number: newNumber, id:(persons.length+1)}))
  }

  const handleNewNameChange = (event) => { setNewName(event.target.value) }
  const handleNewNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearchInput = (event) => {
    const currentInput = event.target.value 
    setSearchInput(currentInput) 
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2> Search </h2>
        <div>
          search: <input value={searchInput} onChange={handleSearchInput}/>
        </div>
      <h2> Contacts </h2>
      <div>
        {
        //This could probably be handled better by a separate contacts component.
        searchInput !== '' 
        ? persons.map((person) => {
          if(searchInput.toLowerCase() === person.name.substring(0, searchInput.length).toLowerCase()) return (<p key={person.id}> {person.name} <br /> {person.number} </p>)
        })
        : persons.map((person) => (<p key={person.id}> {person.name} <br /> {person.number} </p>))
        }
      </div>
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