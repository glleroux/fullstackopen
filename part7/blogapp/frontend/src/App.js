import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import loginService from './services/login';
import userService from './services/user';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/usersReducer';
import { notify } from './reducers/notificationReducer';
import { setUser } from './reducers/userReducer';
import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Navigation from './components/Navigation';

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((loggedUser) => {
        dispatch(setUser(loggedUser));
        userService.setUser(loggedUser);
        dispatch(notify(`${loggedUser.name} logged in!`));
      })
      .catch((error) => {
        console.log(error);
        dispatch(notify('wrong username/password', 'alert'));
      });
  };

  console.log(user);

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <Container>
      <Navigation />
      <Notification />

      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:id" element={<User />} />
        <Route path="blogs/:id" element={<Blog />} />
      </Routes>
    </Container>
  );
}

export default App;
