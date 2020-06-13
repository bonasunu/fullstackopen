import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import peep from './services/peep';
import './index.css';

const Message = ({msg}) => {
  if (msg === null) {
      return null
    }
  

  return (
      <div className='success'>
          <p>{msg}</p>
      </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ msgAlert, setMsgAlert ] = useState(null)

  useEffect(() => {
      console.log('effect');
      peep
        .getPeep()
        .then(response => {
            console.log('promise fulfilled');
            setPersons(response);
        })
  }, []);
  console.log('render', persons.length, 'notes')
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
      setNewFilter(event.target.value);
  }

  const del = (name) => {
    const win = window.confirm(`delete ${name.target.value}?`);
    console.log(win);
    console.log(persons.filter(person => person.name === name.target.value)[0].id)
    axiosDelPeep(persons.filter(person => person.name === name.target.value)[0].id)
  }
  
  const axiosDelPeep = (id) => {
      peep.deletePeep(id);
  }

  const addPhonebook = (event) => {

    event.preventDefault()

    // TODO HTTP CREATE, UPDATE
    let samePeep = false
    //let peepId;
    persons.forEach(item => {
      if (item.name === newName) {
          //peepId = item.id
          samePeep = true
          //console.log('peepID', peepId)
          console.log('samePeep', samePeep)
      }
      });

    if (samePeep === true) {
      const win = window.confirm(`${newName} is already added to phonebook, replace the odd number with the new one?`);
      console.log(win);
      //console.log('peepId', peepId)

      const personName = {
        name: newName,
        number: newNumber
      }

      console.log('personName', personName)
      console.log('persons', persons.filter(item => item.name === personName.name)[0].id)

      peep
        .updatePeep(personName, (persons.map(item => item).filter(item => item.name === newName)[0].id))
        .then(response =>{
          console.log('response', response)
          setPersons(persons.map(item => item.name !== newName ? item : item = personName));
          console.log(persons)
          setNewName('');  
          setNewNumber('');

        })
    }
    else {
      const personName = {
        name: newName,
        number: newNumber
      }

      peep
        .addPeep(personName)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response));
        })
      
      setMsgAlert(`Added ${newName}`)
      setTimeout(() => {
        setMsgAlert(null)
      }, 5000)
      setNewName('');  
      setNewNumber('');
    
    }
  }

  return (
    <div>
      <Message msg={msgAlert}/>
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
      <Person persons={[...persons]} newFilter={newFilter} del={del}/>       
    </div>
  )
}

export default App