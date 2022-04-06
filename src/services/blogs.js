import axios from 'axios'
//const baseUrl = '/api/blogs'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async (loggedUserID) => {
  const request = await axios.get(baseUrl)
  return request.data.filter(blog => blog.user.id === loggedUserID).sort((a,b) => b.likes-a.likes)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${ baseUrl }/${id}`, newObject)
  return request.data
  //return request.then(response => response.data)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

export default { setToken, getAll, create, update, deleteBlog }