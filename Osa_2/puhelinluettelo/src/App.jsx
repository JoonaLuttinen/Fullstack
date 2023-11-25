import { useState } from 'react'

const Numbers = ({name}) => {
  return(
    <div>
      {name}
    </div>
  )

}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const setOnChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const setOnClick = (event) => {
    event.preventDefault()

    const newPerson = {name: newName}
    setPersons(persons.concat(newPerson))
    setNewName('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
                  value={newName}
                  onChange={setOnChange}
                />
        </div>
        <div>
          <button type="submit" onClick={setOnClick}>add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <Numbers name={person.name} key={person.name}/>)}
      </div>
      
    </div>
  )

}

export default App