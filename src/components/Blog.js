import React, { useState } from 'react'

const Blog = ({ blog, handleBlogs }) => {
  const [isFullyVisible, setIsFullyVisible] = useState(true)

  // Exercise 5.7
  const toggleCompleteVisibility = () => {
    setIsFullyVisible(!isFullyVisible)
  }

  // Exercise 5.8
  const handleBlogLikesNumber = (blogID, blogLikes) => () => {
    const newBlogContent = { likes: blogLikes + 1 }
    //console.log(blogID, blogLikes)
    handleBlogs('updateLikes', { newBlogContent, blogID })
  }

  // Exercise 5.10
  const handleDeleteBlog = (blogID, title, author) => () => {
    //console.log(blogID, title, author)
    const wantToRemoveBlog = window.confirm(`Remove blog ${title} by ${author}`)
    if (wantToRemoveBlog) {
      handleBlogs('delete', { blogID })
    }
  }

  // Exercise 5.7
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <>
        <div className='blog'>
          {`${blog.title} ${blog.author}`}
          <button onClick={toggleCompleteVisibility}>{isFullyVisible ? 'view' : 'hide'}</button>
        </div>
        {
          isFullyVisible
            ? null
            : <>
              <div>{blog.url}</div>
              <div className='likesInfo'>
                <span className='numberOfLikes'>{`likes ${blog.likes}`}</span>
                <button className='addLikesButton' onClick={handleBlogLikesNumber(blog.id, blog.likes)}>like</button>
              </div>
              <div>{blog.user.name}</div>
              <button className='removeBlog' onClick={handleDeleteBlog(blog.id, blog.title, blog.author)}>remove</button>
            </>
        }
      </>
    </div>
  )
}

export default Blog