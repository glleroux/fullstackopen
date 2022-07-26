import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser='default' }) => {

	const [showDetailed, setShowDetailed] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	console.log(blog)

	return (

		<div className={'blog'} style={blogStyle} data-cy='blog'>
			<span>{blog.title}</span> <span>{blog.author}</span>
			<button className='toggle-detail' onClick={() => setShowDetailed(!showDetailed)}>{showDetailed ? 'hide' : 'view'}</button>
			{
				showDetailed
					? <>
						<div>{blog.url}</div>
						<div>{blog.likes}<button id='like-submit' onClick={() => handleLike(blog)}>like</button></div>
						<div>{blog.user.name}</div>
						{console.log(`${currentUser.username} + ${blog.user.username}`)}
						{currentUser.username === blog.user.username && <div><button id='remove' onClick={() => handleDelete(blog)}>remove</button></div>}
					</>
					: null
			}
		</div>

	)}

export default Blog