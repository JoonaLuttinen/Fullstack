import { useState } from 'react'

const Button = ({handleClick, text}) => {

  return(
      <button onClick = {handleClick}>
        {text}
      </button>
  )
}

const StatisticLine = ({value, text}) => {

  if (!value) {
    value = 0
  }

  if (value == "NaN %") {
    value = "0 %"
  }

    return (
    <table>
      <tbody>
       <tr>
        <td>{text}</td>
        <td>{value}</td>
       </tr>
      </tbody>
    </table>

    )
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [pressed, setPressed] = useState(false)
  const [anecdote, setAnecdote] = useState("If it hurst, do it more often.")
  const [vote, setVote] = useState(0)


  // määritellään jokaisen nappulan toiminta
  const pressingGood = () => {
      setGood(good + 1)
      setAll(all +1)
      setAverage(average + 1)
      setPressed(true)
  }

  const pressingNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setPressed(true)
  }

  const pressingBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
    setPressed(true)
  }

  const randomAnecdote = () => {
    while(true){
      const randomAnecdote = Math.floor((Math.random()*7))

      // tämä varmistaa ettemme näytä samaa anecdoottia kahta kertaa peräkkäin
      if(anecdotes[randomAnecdote] != anecdote){
        setAnecdote(anecdotes[randomAnecdote])
        break
      }
      else{
        continue
      }
        
    }
  }

  const voting = () => {
    setVote(vote + 1)
  }

  // jos mitään nappulaa ei ole painettu näytetään tämä
  if (!pressed) {
    return (
      <div>
        <h1>Give Feedback</h1>
        <Button handleClick={pressingGood} text ={"good"}/>
        <Button handleClick={pressingNeutral} text ={"neutral"}/>
        <Button handleClick={pressingBad} text ={"bad"}/>
        <h1>Statistics</h1>
        <p>No feedback given</p>
        <Button handleClick={randomAnecdote} text={"next anecdote"}/>
        <p>{anecdote}</p>
      </div>
    )
  }

  // muuten näytetään tämä
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={pressingGood} text ={"good"}/>
      <Button handleClick={pressingNeutral} text ={"neutral"}/>
      <Button handleClick={pressingBad} text ={"bad"}/>
      <h1>Statistics</h1>
      <StatisticLine value={good} text = {"good"}/>
      <StatisticLine value={neutral} text = {"neural"}/>
      <StatisticLine value={bad} text = {"bad"}/>
      <StatisticLine value={all} text = {"all"}/>
      <StatisticLine value={average / all} text={"average"}/>
      <StatisticLine value={`${(good*100)/all} %`} text={"positive"} />
      <Button handleClick={randomAnecdote} text={"next anecdote"}/>
      <Button handleClick={voting} text={"vote"}/>
      <p>{anecdote}</p>
      <p>{`This has ${vote} votes`}</p>


    </div>
  )
}

export default App