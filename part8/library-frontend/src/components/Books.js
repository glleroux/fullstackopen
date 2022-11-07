import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { BOOKS_BY_GENRE } from '../queries'

const Books = (props) => {

  const { books } = props
  const genres = [...new Set(books.map(book => book.genres).flat())];
  const [filter, setFilter] = useState(null)

  const { data, loading } = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: filter }
  })

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {loading
            ? <div>loading</div>
            : data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {
          genres.map(genre => <GenreFilter key={genre} text={genre} onClick={handleFilter} />)
        }
        <GenreFilter text={'all'} onClick={() => setFilter(null)} />
      </div>
    </div>
  )
}

function GenreFilter({ text, onClick }) {

  return (
    <button onClick={onClick} value={text}>
      {text}
    </button>
  )
}

export default Books
