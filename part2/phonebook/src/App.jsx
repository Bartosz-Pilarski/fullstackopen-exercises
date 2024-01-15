import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'


const Person = ({person, persons, setPersons}) => {
  const handleDeletePerson = (id) => {
    if(!window.confirm("Do you really want to delete this contact?")) return
    phonebookService
      .deleteContact(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        alert(`${person.name} was already removed`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  return (
    <p> 
      {person.name} 
      <br /> 
      {person.number} 
      <br /> 
      <DeletePersonButton id={person.id} handleDeletePerson={() => handleDeletePerson(person.id)}/> 
    </p>
    )}

const DeletePersonButton = ({id, handleDeletePerson}) => {
  return (<button onClick={() => handleDeletePerson(id)}> delete </button>)
}

const Contacts = ({persons, setPersons, searchInput}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {
        searchInput !== '' 
        ? persons.map((person) => {
          if(searchInput.toLowerCase() === person.name.substring(0, searchInput.length).toLowerCase()) return (<Person key={person.id} person={person} persons={persons} setPersons={setPersons}/>)
        })
        : persons.map((person) => <Person key={person.id} person={person} persons={persons} setPersons={setPersons}/>)
        }
      </div>
    </div>
  )
}

const ContactForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

  const handleNewNameChange = (event) => { setNewName(event.target.value) }
  const handleNewNumberChange = (event) => { setNewNumber(event.target.value) }

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    const newPerson = {name: newName, number: newNumber}
    //find the first element with the same name. true if exists.
    const existingPerson = persons.find((person) => person.name === newName )
    if(existingPerson !== undefined) {
      if(!confirm(`${newName} is already a contact! Replace old number?`)) return 

      phonebookService
      .editContact(existingPerson.id, newPerson)        
      .then(response => {
        setPersons(persons.map((person) => person.id === existingPerson.id ? response : person))
      })
      .catch(error => {
        alert(`${person.name} was already removed`)
        setPersons(persons.filter(person => person.id !== id))
      })
      return
    }
    phonebookService
      .createContact(newPerson)        
      .then(response => {
        setPersons(persons.concat(response))
      })
  }

  return (
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
  )
}

const Search = ({searchInput, setSearchInput}) => {

  const handleSearchInput = (event) => {
    const currentInput = event.target.value 
    setSearchInput(currentInput) 
  }

  return (
    <div>
      <h2> Search </h2>
      <div>
        search: <input value={searchInput} onChange={handleSearchInput}/>
      </div>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [searchInput, setSearchInput] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    phonebookService
    .getAllContacts()
    .then((response) => {
      setPersons(response)
    })
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchInput={searchInput} setSearchInput={setSearchInput}/>
      <br />
      <ContactForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}/>
      <Contacts persons={persons} setPersons={setPersons} searchInput={searchInput}/>
    </div>
  )
}

export default App