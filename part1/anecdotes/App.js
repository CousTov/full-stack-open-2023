import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

  const Button = (props) => <button onClick={props.click}>{props.text}</button>
   
  const [selected, setSelected] = useState(0)

  const generateRandom = () => {
    let index = Math.floor(Math.random() * anecdotes.length)
    if (index !== selected) {
      setSelected(index)
    }
    else{
      generateRandom()
    }
  }

  const addPoint = () => {
    const dupe = [...votes]
    dupe[selected]++
    setVote(dupe)
  }

  const MostVotes = () => {
    const maxVal = Math.max(...votes)
    const maxIndex = votes.indexOf(maxVal)
    if (maxVal !== 0){
      return(
        <div>
          <p> {anecdotes[maxIndex]} </p>
          <p>Has {votes[maxIndex]} votes</p>
        </div>
      )
    }
    else {
      return(
        <p>No Votes Yet</p>
      )
    }
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
      <Button click={generateRandom} text="Next Random" />
      <Button click={addPoint} text="Vote" />
      <h1>Anecdote with the most votes</h1>
      <MostVotes />
    </div>
  )
}

export default App