import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'

describe('<Togglable />', () => {

	let container

	beforeEach(() => {
		container = render(
			<Toggleable buttonLabel="view">
				<div className="testDiv">
                    togglable content
				</div>
			</Toggleable>
		).container
	})

	test('renders its children', () => {
		screen.findAllByText('togglable content')
	})

	test('after clicking the button, children are displayed', async () => {
		const user = userEvent.setup()
		const button = screen.getByText('view')
		await user.click(button)

		const div = container.querySelector('.togglableContent')
		expect(div).not.toHaveStyle('display: none')
	})

	// test('clicking on like button calls event handler once', async () => {
	// 	const blog = {
	// 		'title': 'test blog99',
	// 		'author': 'test author99',
	// 		'url': 'test url 99',
	// 		'likes': '999'
	// 	}

	// 	const mockHandler = jest.fn()

	// 	render(<Blog blog={blog} handleLike={mockHandler}/>)

	// 	screen.debug()

	// 	const user = userEvent.setup()
	// 	const button = screen.getByText('like')
	// 	await user.click(button)

	// 	expect(mockHandler.mock.calls).toHaveLength(1)
	// })

})