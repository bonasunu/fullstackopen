import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword
}) => (
  <form onSubmit={handleLogin}>
    <div>
            username
      <input
        type='text'
        value={username}
        name='Username'
        onChange = { ({ target }) => setUsername(target.value)}
      ></input>
    </div>
    <div>
            password
      <input
        type='password'
        value={password}
        name='Password'
        onChange= { ({ target }) => setPassword(target.value)}
      >
      </input>
    </div>
    <button type='submit'>Login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.string.isRequired,
  setPassword: PropTypes.string.isRequired

}

export default LoginForm