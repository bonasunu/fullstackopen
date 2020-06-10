import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const addPhonebook = (event) => {

    event.preventDefault()

    try {
        persons.forEach(item => {
            if (item.name === newName) {
                var err = "is already added to phonebook";
                throw err;
            }
            else {
                const personName = {
                    name: newName,
                    number: newNumber
                }
            
                setPersons(persons.concat(personName));
                setNewName('');  
                setNewNumber('');   
                   
            }
        });
    }
    catch(err) {
        setPersons(persons);
        setNewName(newName);
        setNewNumber(newNumber);
        alert(`${newName} ${err}`);
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} toFilterChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        submit={addPhonebook} 
        newName={newName} 
        nameChange={handleNameChange} 
        newNumber = {newNumber}
        numberChange = {handleNumberChange}
      />

      <h2>Numbers</h2>
      <Person persons={persons} newFilter={newFilter}/>       
    </div>
  )
}

export default App