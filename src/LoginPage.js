import { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const API_URL = process.env.REACT_APP_BASEURL;
  const API_KEY = process.env.REACT_APP_APIKEY;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY}`, {
      username: username,
      password: password,
      request_token: '',
    });

    if (response.status === 200 && response.data.success) {
      // TODO: handle successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="Login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
        {errorMessage && <div className="Error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default LoginPage;