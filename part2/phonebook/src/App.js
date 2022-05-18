import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import './index.css'

const App = () => {
  
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson ] = useState({name: "", number: ""})
  const [showFiltered, setShowFiltered] = useState(false)
  const [searchQuery, setSearchQuery] = useState({value: ""})
  const [notification, setNotification] = useState(null)

  const personsToShow = showFiltered ? 
    persons.filter(person => person.name.toLowerCase().includes(searchQuery.value.toLowerCase())) 
    : persons

  const hook = () => {
    personService.getAll()
      .then(persons => {
        setPersons(persons)
      }) 
  }
  useEffect(hook, [])  

  const addName = (e) => {
    e.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newPerson.name.toLowerCase())) { 
      if(window.confirm(`${newPerson.name} already exists. Update?`)) {
        const existingPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase());
        personService.update(existingPerson.id, newPerson)
          .then(showNotification(`${newPerson.name} updated`))
          .catch(() => {
            showNotification(`${newPerson.name} not present in phonebook`)
          })
        setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
        console.log(persons)
      } else {
        return
      }
    } else {
      personService.create(newPerson)
        .then(showNotification(`Created ${newPerson.name}`))
      setPersons(persons.concat([newPerson]))
    }
  }

  const handleSearch = (e) => {
    setShowFiltered(true)
    const value = e.target.value;
    setSearchQuery({
      ...searchQuery,
      value: value
    })
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setNewPerson({
      ...newPerson,
      [e.target.name]: value
    });
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)}, 5000)
  }

  const handleDelete = (e) => {
    const id = e.target.parentNode.id;
    console.log(id)
    if (window.confirm(`Delete ${e.target.parentNode.firstChild.data}?`)) {
      personService.deletePerson(id)
      showNotification(`Deleted ${e.target.parentNode.firstChild.data}`)
      personService.getAll()
        .then(persons => {
          setPersons(persons)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <SearchFilter handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <AddPersonForm addName={addName} handleChange={handleChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

const SearchFilter = ({ handleSearch }) => <div>filter shown with <input name="name" onChange={handleSearch}/></div>

const AddPersonForm = ({ addName, handleChange }) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input name="name" onChange={handleChange}/>
        <div>
          number: <input name="number"onChange={handleChange}/>
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

const Persons = ({ personsToShow, handleDelete }) => personsToShow.map(person => <Person id={person.id} name={person.name} number={person.number} handleDelete={handleDelete}/>)

const Person = ({ id, name, number, handleDelete }) => <p id={id} key={id}>{name} {number} <button onClick={handleDelete}>Delete</button></p>

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

export default App  