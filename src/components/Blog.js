import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogs }) => {
  const [isFullyVisible, setIsFullyVisible] = useState(true)
  
  // Exercise 5.7
  const toggleCompleteVisibility = () => {
    setIsFullyVisible(!isFullyVisible)
  }
  
  // Exercise 5.8
  const handleLikesNumber = (blogID, blogLikes) => () => {
    const blogUpgraded = {likes: blogLikes + 1}
    console.log(blogID, blogLikes)
    blogService.update(blogID, blogUpgraded)
    handleBlogs(blogUpgraded, 'update', blogID)
  }

  // Exercise 5.10
  const handleDeleteBlog = (blogID, title, author) => () => {
    console.log(blogID, title, author)
    const wantToRemoveBlog = window.confirm(`Remove blog ${title} by ${author}`)
    if (wantToRemoveBlog) {
      blogService.deleteBlog(blogID)
      handleBlogs({}, 'delete', blogID)
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
      {isFullyVisible
        ? <>
            {blog.title} {blog.author}
            <button onClick={toggleCompleteVisibility}>view</button>
          </>
        : <>
            {blog.title} {blog.author} 
            <button onClick={toggleCompleteVisibility}>hide</button>
            <div>{blog.url}</div>
            likes {blog.likes}
            <button onClick={handleLikesNumber(blog.id, blog.likes)}>like</button>
            <div>{blog.user.name}</div>
            <button onClick={handleDeleteBlog(blog.id, blog.title, blog.author)}>remove</button>
          </>
      }
    </div>
  )
}

export default Blog