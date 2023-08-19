import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'person')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const phoneObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const existCheck = persons.filter(person => person.name === newName).length === 0 ? true : false
    const emptyCheck = newName.length > 0 && newNumber.length > 0 ? true : false

    if(!emptyCheck){
      alert("Please fill out the form before adding")
    } else if (existCheck){
      personService
        .addPerson(phoneObject)
        .then(returnedPhone => {
          setPersons(persons.concat(returnedPhone))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added ${phoneObject.name} to the phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage(
            `Note: ${phoneObject.name} was already added to the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons)
            })
        })
    } else if(window.confirm(`${newName} already exists in the phonebook. Do you want to replace the old number with the new one?`)) {
      const dupe = persons.filter(person => person.name === newName)
      personService.update(dupe[0].id, phoneObject).then(() => {
        personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
          setMessage(
            `Replaced ${dupe[0].name}'s number`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          setMessage(
            `Note: ${dupe[0].name} was removed already from the phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          })
        })
    }
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Do you wish to permanently delete ${name}?`)){
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.name !== name))
        setMessage(
          `Deleted ${name} from the phonebook`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
      .catch(error => {
        setMessage(
          `Note: ${name} was already deleted from the server`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a new contact</h2>
      <PersonForm 
        handleAdd={handleAdd}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={handleDelete} />
    </div>
  )
}

export default App