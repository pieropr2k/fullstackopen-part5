import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ handleBlogs, handlePopUp }) => {
  // Exercise 5.6
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      //console.log(newBlog)
      //console.log(title, author, url)
      handleBlogs(newBlog)
      handlePopUp(`a new blog '${title}' by ${author} added`, false)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      //console.log(exception.response)
      handlePopUp(exception.response.data.error, true)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Username"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}
export default BlogForm