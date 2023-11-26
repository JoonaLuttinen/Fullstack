import { useState } from 'react'

const Filter = ({filter, setFilterOnChange}) => {
  return(
    <input value={filter} onChange={setFilterOnChange}/>
  )
}

const Form = ({values, functions}) => {
  return(
    <form>
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

const Numbers = ({name, number}) => {
  return(
    <div>
      {name} {number}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: 1234567812},
    {name: 'Petteri Saarijärvi', number: 8407788325},
    {name: 'Petri järvi', number: 894387284},

  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filteredList, setFilteredList] = useState(persons)

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
        alert(`${newName} is already added to phonebook`)
    }
    else {
      const newPerson = {name: newName, number: newNumber}

      setPersons(persons.concat(newPerson))
      setFilteredList(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      setFilter('')
    }
    

  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filter={filter} setFilterOnChange={setFilterOnChange}/>
      </div>

      <h3>Add a new</h3>
      <Form values={{name: newName, number: newNumber}} 
            functions={{setName: setNameOnChange, setNumber: setNumberOnChange, setClick: setOnClick}}/>
      <h3>Numbers</h3>
      <div>
        {filteredList.map(person => <Numbers name={person.name} number={person.number} key={person.name}/>)}
      </div>
      
    </div>
  )

}

export default App