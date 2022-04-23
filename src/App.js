import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if(user){
      blogService.getAll(user.id).then(blogs =>
        setBlogs(blogs)
      )
    } else {
      setBlogs([])
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const popUpAdvicer = (text, checkIfIsError) => {
    setIsError(checkIfIsError)
    setErrorMessage(text)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleBlogs = async (APImethod, newBlog = {}) => {
    const { newBlogContent, blogID } = newBlog
    try {
      if (APImethod === 'create') {
        blogFormRef.current.toggleVisibility()
        const newBlogFormatted = await blogService.create(newBlogContent)
        popUpAdvicer(`a new blog '${newBlogContent.title}' by ${newBlogContent.author} added`, false)
        setBlogs(blogs.concat(newBlogFormatted))
      } else if (APImethod === 'updateLikes') {
        await blogService.update(blogID, newBlogContent)
        setBlogs(blogs.map(blog => blog.id===blogID ? { ...blog, likes: newBlogContent.likes } : blog))
      } else if (APImethod === 'delete') {
        await blogService.deleteBlog(blogID)
        setBlogs(blogs.filter(blog => blog.id !== blogID))
      }
    } catch (error) {
      //console.log(error, 'checking error')
      popUpAdvicer(error.response.data.error, true)
      //console.log(error.response.data.error, true)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log(user)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      popUpAdvicer(exception.response.data.error, true)
    }
  }

  // Exercise 5.5
  return (user)
    ? (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} isError={isError}/>
        <div>
          {user.name} logged in
          <button onClick={handleLogOut}>logout</button>
        </div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm handleBlogs={handleBlogs}/>
        </Togglable>
        {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} handleBlogs={handleBlogs}/>
        )}
      </div>
    )
    : (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} isError={isError}/>
        <LoginForm handleLogin={handleLogin}
          inputValues={{ username, password }}
          eventHandlers={{ setUsername, setPassword }}
        />
      </div>
    )
}

export default App