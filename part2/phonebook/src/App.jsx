import { useEffect, useState } from 'react'
import phonebookService from './services/phonebook'


const Person = ({person, handleDeletePerson}) => (<p> {person.name} <br /> {person.number} <br /> <DeletePersonButton id={person.id} handleDeletePerson={handleDeletePerson}/> </p>) 
const DeletePersonButton = ({id, handleDeletePerson}) => {
  return (<button onClick={() => handleDeletePerson(id)}> delete </button>)
}

const Contacts = ({persons, setPersons, searchInput}) => {

  const handleDeletePerson = (id) => {
    if(!window.confirm("Do you really want to delete this contact?")) return
    phonebookService
      .deleteContact(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {
        searchInput !== '' 
        ? persons.map((person) => {
          if(searchInput.toLowerCase() === person.name.substring(0, searchInput.length).toLowerCase()) return (<Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>)
        })
        // The check inside the key prop is required for submitting a new contact. 
        // The new contact does not actually have an id value until it's fetched from the server later, but needs to be rendered.
        : persons.map((person) => <Person key={person.id === undefined ? persons.length : person.id} person={person} handleDeletePerson={handleDeletePerson}/>)
        }
      </div>
    </div>
  )
}

const ContactForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewNameChange = (event) => { setNewName(event.target.value) }
  const handleNewNumberChange = (event) => { setNewNumber(event.target.value) }

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    //find the first element with the same name. true if exists.
    if(persons.find((person) => person.name === newName ) !== undefined) return alert(`${newName} is already a contact!`)

    const newPerson = {name: newName, number: newNumber}

    phonebookService
      .createContact(newPerson)        
      .then(response => {
        setPersons(persons.concat(newPerson))
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

  useEffect(() => {
    phonebookService
    .getAllContacts()
    .then((response) => setPersons(response))
  }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchInput={searchInput} setSearchInput={setSearchInput}/>
      <br />
      <ContactForm persons={persons} setPersons={setPersons}/>
      <Contacts persons={persons} setPersons={setPersons} searchInput={searchInput}/>
    </div>
  )
}

export default App