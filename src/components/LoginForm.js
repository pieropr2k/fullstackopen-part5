import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, inputValues, eventHandlers }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={inputValues.username}
          name="Username"
          onChange={({ target }) => eventHandlers.setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={inputValues.password}
          name="Password"
          onChange={({ target }) => eventHandlers.setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
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