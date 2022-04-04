const LoginForm = ({handleLogin, inputValues, eventHandlers}) => {
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
export default LoginForm