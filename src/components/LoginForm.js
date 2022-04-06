import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, inputValues, eventHandlers }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={inputValues.username}
          name="Username"
          onChange={({ target }) => eventHandlers.setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={inputValues.password}
          name="Password"
          onChange={({ target }) => eventHandlers.setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

// Exercise 5.11
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired,
  eventHandlers: PropTypes.object.isRequired
}

export default LoginForm