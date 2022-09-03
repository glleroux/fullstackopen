import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes) 
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
      dispatch(voteAnecdote(anecdote))
      dispatch(notify(`Voted for anecdote '${anecdote.content}'`, 5))
    }

    console.log(anecdotes)
    const anecdotesForSort = [...anecdotes]

    return (
        <>
        {anecdotesForSort.sort((a,b) => (b.votes - a.votes)).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </>
    )
}

export default AnecdoteList