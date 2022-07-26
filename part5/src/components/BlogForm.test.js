import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
	const createBlog = jest.fn()
	const showNotification = jest.fn()
	const user = userEvent.setup()

	render(<BlogForm createBlog={createBlog} showNotification={showNotification}/>)

	const input = screen.getByPlaceholderText('blog title')
	const createButton = screen.getByText('create')

	await user.type(input, 'testing a form...' )
	await user.click(createButton)

	screen.debug()

	expect(createBlog.mock.calls).toHaveLength(1)
})