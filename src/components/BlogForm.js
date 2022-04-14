import { useState } from 'react'

const BlogForm = ({ handleBlogs }) => {
  // Exercise 5.6
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlogContent = {
      title,
      author,
      url,
    }
    handleBlogs('create', { newBlogContent })
    //handlePopUp(`a new blog '${title}' by ${author} added`, false)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate} id='blogForm'>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
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