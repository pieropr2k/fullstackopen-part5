import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
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

// Exercise 5.13
test('renders content', () => {
  const { container } = render(<Blog blog={blog}/>)
  //component.getByText('blog.title + blog.author')
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
})

// Exercise 5.14
test('clicking the button calls event handler once', async () => {
  const component = render(<Blog blog={blog} />)
  const button = component.getByText('view')
  //fireEvent.click(button)
  await userEvent.click(button)
  const URLdiv = component.getByText(blog.url)
  const regexObj = new RegExp(blog.likes)
  const numberLikesDIV = component.getByText(regexObj)
  //component.debug(numberLikesDIV)
  expect(URLdiv).toBeDefined()
  expect(numberLikesDIV).toBeDefined()
})

// Exercise 5.15
test('like button is clicked twice', async () => {
  // its like a spy
  const mockHandler = jest.fn()
  //render(<Blog blog={blog} handleBlogs={mockHandler} />)
  const component = render(<Blog blog={blog} handleBlogs={mockHandler}/>)
  const viewCompleteBlogButton = component.getByText('view')
  await userEvent.click(viewCompleteBlogButton)
  const likesButton = component.container.querySelector('.addLikesButton')
  //component.debug(likesButton)
  await userEvent.click(likesButton)
  await userEvent.click(likesButton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})