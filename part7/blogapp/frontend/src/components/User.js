/* eslint-disable consistent-return */
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function User() {
  const users = useSelector((state) => state.users);

  if (!users) {
    return;
  }

  const { id } = useParams();
  const userToView = users.filter((user) => user.id === id)[0];

  return (
    <>
      <h2>{userToView.name}</h2>
      <h2>added blogs</h2>
      <ul>
        {userToView.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
}

export default User;
