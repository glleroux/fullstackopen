import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
 
  const dispatch = (e) => {
    store.dispatch({
      type: e.target.id
    }) 
  }

  return (
    <div>
      <button id='GOOD' onClick={dispatch}>good</button>
      <button id='OK' onClick={dispatch}>ok</button>
      <button id='BAD' onClick={dispatch}>bad</button>
      <button id='ZERO' onClick={dispatch}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
