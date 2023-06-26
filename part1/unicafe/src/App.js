import { useState } from 'react'

const Statistics = (props) => {
  let total = props.good + props.neutral + props.bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value = {props.bad}/>
        <StatisticLine text="all" value = {total}/>
        <StatisticLine text="average" value={parseFloat(((props.good - props.bad ) / total))} />
        <StatisticLine text="positive" value={`${parseFloat(((props.good / total) * 100))} %`} />
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return(
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}


const Button = (props) => <button onClick={props.click}>{props.txt}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  
  
  const handleBad = () => {
    setBad(bad + 1)
  }
  
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button click={handleGood} txt="Good" />
      <Button click={handleNeutral} txt="Nutral" />
      <Button click={handleBad} txt="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}
export default App