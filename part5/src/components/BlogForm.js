import { useState } from 'react'

const BlogForm = ({ showNotification, createBlog }) => {

	const [newBlog, setNewBlog] = useState({
		title: '',
		author: '',
		url: ''
	})

	return (
		<form onSubmit={(event) => {
			event.preventDefault()
			createBlog(newBlog)
			showNotification(`${newBlog.title} by ${newBlog.author} added`)
			setNewBlog({ ...newBlog, title: '', author: '', url: '' })
		}}>
			<div>title:<input id='title' placeholder='blog title' value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}/></div>
			<div>author:<input id='author' placeholder='blog author' value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/></div>
			<div>url:<input id='url' placeholder='blog url' value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/></div>
			<button id='blog-submit' type="submit">create</button>
		</form>
	)}

export default BlogForm