import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
	const blog = {
		'title': 'test blog99',
		'author': 'test author99',
		'url': 'test url 99',
		'likes': '999'
	}

	render(<Blog blog={blog} />)

	let element = screen.getByText('test blog99')
	expect(element).toBeDefined()
	element = screen.getByText('test author99')
	expect(element).toBeDefined()
})

test('does not render url and likes', () => {
	const blog = {
		'title': 'test blog99',
		'author': 'test author99',
		'url': 'test url 99',
		'likes': '999'
	}

	render(<Blog blog={blog} />)

	let element = screen.queryByText('test url 99')
	expect(element).toBeNull()
	element = screen.queryByText('999')
	expect(element).toBeNull()
})

test('clicking on like button calls event handler once', async () => {
	const blog = {
		'title': 'test blog99',
		'author': 'test author99',
		'url': 'test url 99',
		'likes': '999',
		'user': {
			'name': 'test user'
		}
	}

	const mockHandler = jest.fn()

	render(<Blog blog={blog} handleLike={mockHandler}/>)

	const user = userEvent.setup()
	const viewButton = screen.getByText('view')
	await user.click(viewButton)
	const likeButton = screen.getByText('like')
	await user.click(likeButton)
	await user.click(likeButton)

	expect(mockHandler.mock.calls).toHaveLength(2)
})