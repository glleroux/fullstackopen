import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, updatePoints] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const handleClick = () => {
    
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)))
  }

  const vote = () => {
     let copy = [...points];
     copy[selected] += 1;
     updatePoints(copy)
     let highest = copy.indexOf(Math.max(...copy));
     setMostVoted(highest)
  }

  return (
    <>
      <AnecdoteDisplay title="Anecdote of the day" anecdotes={anecdotes} selected={selected} points={points}/>
      <button onClick={vote}>vote</button><button onClick={handleClick}>next anecdote</button>
      <AnecdoteDisplay title="Anecdote with most votes" anecdotes={anecdotes} selected={mostVoted} points={points}/>
    </> 
  )
}

const AnecdoteDisplay = ({ title, anecdotes, selected, points }) => {
  return(
    <>
    <h2>{title}</h2>
    <div>{anecdotes[selected]}</div>
    {
      (points[selected] === 1) ? <p>has {points[selected]} vote</p> : <p>has {points[selected]} votes</p>
    }
    </>
  )
}

export default App;
