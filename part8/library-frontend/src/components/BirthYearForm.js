import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BYEAR, ALL_AUTHORS } from '../queries'

const BirthYearForm = ({ authors }) => {
    const [author, setAuthor] = useState('')
    const [birthYear, setBirthYear] = useState('')

    const [editBYear] = useMutation(EDIT_BYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const submit = (event) => {
        event.preventDefault()
        editBYear({ variables: { name: author, setBornTo: birthYear } })

        setAuthor('')
        setBirthYear('')
    }

    return (
        <div>
            <h2>Set birthyear</h2>

            <form onSubmit={submit}>
                <div>
                    author
                    <select value={author} onChange={({ target }) => setAuthor(target.value)}>
                        {authors.map(author => <option key={author.id} value={author.name}>{author.name}</option>)}
                    </select>
                </div>
                <div>
                    born <input
                        type='number'
                        value={birthYear}
                        onChange={({ target }) => setBirthYear(parseInt(target.value))}
                    />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default BirthYearForm