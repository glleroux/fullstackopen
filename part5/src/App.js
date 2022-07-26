import { useState, useEffect, useRef } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggleable'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [notification, setNotification] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs.sort((a, b) => b.likes - a.likes))
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		} catch (exception) {
			showNotification('Wrong credentials')
		}
	}

	const handleLogout = async () => {
		window.localStorage.removeItem('loggedBlogAppUser')
		setUser(null)
	}

	const blogFormRef = useRef()

	const addBlog = (blogObject) => {
		blogFormRef.current.toggleVisibility()
		blogService
			.create(blogObject)
			.then(returnedBlog => {
				setBlogs(blogs.concat(returnedBlog))
			})
	}

	const likeBlog = (blog) => {
		const updatedBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
		blogService
			.like(updatedBlog)
			.then(returnedBlog => {
				setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? returnedBlog : blog))
			})
	}

	const removeBlog = (blogToRemove) => {
		if (window.confirm(`Remove blog ${blogToRemove.name} by ${blogToRemove.author}?`)) {
			blogService
				.remove(blogToRemove.id)
				.then(() => {
					setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
				})
		}
	}

	const showNotification = (message) => {
		setNotification(message)
		setTimeout(() => {
			setNotification(null)}, 5000)
	}

	return (
		<div>
			{user === null ?
				<>
					<h2>blogs</h2>
					<Notification message={notification} />
					<Togglable buttonLabel='login'>
						<LoginForm
							handleSubmit={handleLogin}
							username={username}
							password={password}
							handleUsernameChange={({ target }) => setUsername(target.value)}
							handlePasswordChange={({ target }) => setPassword(target.value)}
						/>
					</Togglable>
				</>
				:
				<div className='app'>
					<h2>blogs</h2>
					<Notification message={notification} />
					<p>{user.name} logged in<button onClick={handleLogout}type="submit">logout</button></p>
					<h2>create new</h2>
					<Togglable buttonLabel='new blog' ref={blogFormRef}>
						<BlogForm showNotification={showNotification} createBlog={addBlog}/>
					</Togglable>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map(blog => <Blog key={blog.id} blog={blog} currentUser={user} handleLike={likeBlog} handleDelete={removeBlog}/>)}
				</div>
			}
		</div>
	)
}

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className='notification'>
			{message}
		</div>
	)
}

export default App
