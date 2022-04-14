import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Final',
  author: 'Lets add',
  url: 'Anderson',
  likes: 0,
  user: {
    id: '623ffde6e3600866551b2178',
    name: 'Superman',
    username: 'roota'
  },
  id: '6246369f0e0a46c47545eb24'
}

// Exercise 5.16
test('new blog form is running', async () => {
  // its like a spy
  const handleBlogsMockHandler = jest.fn()
  //const handlePopUpMockHandler = jest.fn()
  //createNote.mockClear()
  const component = render(<BlogForm
    handleBlogs={handleBlogsMockHandler}
  />)
  const { container } = component
  const titleInput = container.querySelector('input[name="Title"]')
  const authorInput = container.querySelector('input[name="Author"]')
  const URLinput = container.querySelector('input[name="Url"]')
  const sendButton = component.getByRole('button')
  //const blogForm = container.querySelector('#blogForm')
  await userEvent.type(titleInput, blog.title)
  //fireEvent.change(titleInput, { target: { value: blog.title } })
  await userEvent.type(authorInput, blog.author)
  //fireEvent.change(authorInput, { target: { value: blog.author } })
  await userEvent.type(URLinput, blog.url)
  //fireEvent.change(URLinput, { target: { value: blog.url } })
  await userEvent.click(sendButton)
  //fireEvent.submit(blogForm)
  //component.debug(blogForm)
  const { author, title, url } = blog
  expect(handleBlogsMockHandler.mock.calls).toHaveLength(1)
  expect(handleBlogsMockHandler.mock.calls[0][1].newBlogContent)
    .toEqual({ author, title, url })
})