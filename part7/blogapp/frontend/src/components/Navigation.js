import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material';
import userService from '../services/user';
import { setUser } from '../reducers/userReducer';
import { notify } from '../reducers/notificationReducer';

function Navigation() {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setUser(null));
    userService.clearUser();
    dispatch(notify('good bye!'));
  };

  const user = useSelector((state) => state.user);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" />
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Button onClick={logout} color="inherit">
          logout
        </Button>
        <Typography>{`${user.name} logged in`}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
