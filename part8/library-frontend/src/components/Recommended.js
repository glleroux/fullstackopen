const Recommended = (props) => {

    const { books } = props

    const { user } = props
    const favouriteGenre = user.data.me.favouriteGenre
    const recommendedBooks = books.filter(book => book.genres.includes(favouriteGenre))

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h2>recommended</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {recommendedBooks.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommended