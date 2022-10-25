import { React, useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <Container>
      {/* <h2>Log in to application</h2> */}
      <Typography variant="h5" gutterBottom>
        Log in to application
      </Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="username"
            label="Username"
            required
            variant="outlined"
            value={username}
            size="small"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            required
            variant="outlined"
            type="password"
            value={password}
            size="small"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="login-button" type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Container>
  );
}

export default LoginForm;
