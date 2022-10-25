import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
  
    const handleSubmit = (e) => {
      e.preventDefault()
      const anecdote = 
        {
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        }
      addNew(anecdote)
    }
    
    const handleReset = () => {
        content.reset.value()
        author.reset.value()
        info.reset.value()
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div>
            content
            <input 
                name='content'
                {...content}
             />
          </div>
          <div>
            author
            <input
                name='author' 
                {...author}
            />
          </div>
          <div>
            url for more info
            <input 
                name='info'
                {...info}
            />
          </div>
          <button>create</button>
          <input type='reset' value='reset' />
        </form>
      </div>
    )
  
}

export default CreateNew

