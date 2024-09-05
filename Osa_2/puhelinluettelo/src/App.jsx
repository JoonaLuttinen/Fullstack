import { useState, useEffect } from 'react'
import phoneBook from './services/phoneBook'
import Notification from './components/Notification'
import ErrorMessage from './components/errorMessage'

const Filter = ({filter, setFilterOnChange}) => {
  return(
    <input value={filter} onChange={setFilterOnChange}/>
  )
}

const Form = ({values, functions}) => {
  return(
    <form name="persons">
      <div>
        name: <input value={values.name} onChange={functions.setName}/>
      </div>
      <div>
        number: <input value={values.number} onChange={functions.setNumber}/>
      </div>
      <div>
        <button type="submit" onClick={functions.setClick}>add</button>
      </div>
    </form>
  )
}

const Numbers = ({person, deleteButtonOnClick}) => {

  return(
    <div>
      
      {person.name} {person.number} 
      <button onClick={() => deleteButtonOnClick(person)}>delete</button>

    </div>
  )

}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState(persons)
  const [addedMessage, setAddedMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  const hook = () => {
    phoneBook
    .getAll()
    .then((personsData) => {
      setPersons(personsData)
      setFilteredList(personsData)
    })}
  
  useEffect(hook, [])

  const setNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const setNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const setFilterOnChange = (event) => {
    setFilter(event.target.value)
    
    const tempFilter = persons.filter((person) => {
      const re = new RegExp(event.target.value, "i");
      return(person.name.match(re))
    })

    setFilteredList(tempFilter)
  }


  const setOnClick = (event) => {
 
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    
    if(found !== undefined){
        if (window.confirm(`${found.name} has already been added to phonebook, do you want to replace the old number ${found.number} with the new one ${newNumber}`)){

          const updatedPerson = {name: found.name, number: newNumber}

          phoneBook.updateNumber(updatedPerson, found.id).then( returnedData => 
            { 
              setPersons(prevPeople => {
              const index = prevPeople.findIndex(person => person.name === found.name)
              let newListOfPeople = prevPeople
              newListOfPeople[index] = returnedData
              return newListOfPeople
            })
            setFilteredList(prevFilteredList => {
              const index  = prevFilteredList.findIndex(person => person.name === found.name)
              let newFilteredPeople = prevFilteredList
              newFilteredPeople[index] = returnedData
              return newFilteredPeople
            })
            
            setNewName('')
            setNewNumber('')
            setFilter('')
              setTimeout(()=>{
                setErrorMessage(null)
            },5000)
            })
        }
    }
    else {
      const newPerson = {name: newName, number: newNumber}

      phoneBook.addNumber(newPerson).then( returnedData => {        
        setPersons(persons.concat(returnedData))
        setFilteredList(persons.concat(returnedData))

        setAddedMessage(`Added ${newPerson.name}`)
        setTimeout(()=>{
          setAddedMessage(null)
        },5000)

        setNewName('')
        setNewNumber('')
        setFilter('')
      })
      .catch((error) => {
        const errorMessage = error.response.data
        setErrorMessage(errorMessage.error)
        setTimeout(()=>{
          setErrorMessage(null)
        },5000)
      })
      }
  }

  const deleteButtonOnClick = (personInfo) => {
    //event.preventDefault()

    if(window.confirm(`Do you want to delete this number "${personInfo.name} ${personInfo.number}"`)){

      phoneBook.deleteNumber(personInfo.id).then(() => {setPersons(persons.filter(person => person.id !== personInfo.id))
      setFilteredList(persons.filter(person => person.id !== personInfo.id))
      })
    }
  } 


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Notification message={addedMessage}/>
        <ErrorMessage errorMessage={errorMessage}/>
      </div>
      
      <div>
        <Filter filter={filter} setFilterOnChange={setFilterOnChange}/>
      </div>

      <h3>Add a new</h3>
      <Form values={{name: newName, number: newNumber}} 
            functions={{setName: setNameOnChange, setNumber: setNumberOnChange, setClick: setOnClick}}/>
      <h3>Numbers</h3>
      <div>
        {filteredList.map(person => <Numbers person={person} deleteButtonOnClick={deleteButtonOnClick} key={person.name}/>)}
      </div>
    </div>
  )

}

export default App