import React, { useState } from 'react'


const Statistics = ({ good, neutral, bad, total, average, percentPositive }) => {
  
  //html table and tr
  //add td to counter component
  
  return(
    <table>
      <tbody>
        <tr><Counter text="good" count={good}/></tr>
        <tr><Counter text="neutral" count={neutral}/></tr>
        <tr><Counter text="bad" count={bad}/></tr>
        <tr><Counter text="all" count={total}/></tr>
        <tr><Counter text="average" count={average}/></tr>
        <tr><Counter text="positive" count={percentPositive}/></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, updateTotal] = useState(0)

  let average = parseFloat((good - bad)/total).toFixed(2);
  let percentPositive = `${(good/total).toFixed(2)*100}%`;

  

  const handleClick = (e) => {
    updateTotal(total+1);

    switch (e.target.outerText) {
      case 'good':
        setGood(good+1);
        break;
      case 'neutral':
        setNeutral(neutral+1);
        break;
      case 'bad':
        setBad(bad+1);
        break;
      default: console.log("hi");
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" count={good} handleClick={handleClick}/>
      <Button text="neutral" count={neutral} handleClick={handleClick}/>
      <Button text="bad" count={bad} handleClick={handleClick}/>
      <h1>statistics</h1>
      {
        total? <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} percentPositive={percentPositive}/> : <p>No feedback given</p>
      }
    </div>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Counter = ({text, count}) => <><td><p>{text}</p></td><td><p>{count}</p></td></>

export default App;
