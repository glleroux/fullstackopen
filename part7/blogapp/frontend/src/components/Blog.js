/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Typography, Button, TextField } from '@mui/material';
import { deleteBlog, voteBlog, commentBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

function Blog() {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const blogToView = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  );

  if (!user || !blogToView) {
    return;
  }

  const addedBy =
    blogToView.user && blogToView.user.name
      ? blogToView.user.name
      : 'anonymous';

  const own = blogToView.user && user.username === blogToView.user.username;

  const removeBlog = (blogToRemove) => {
    // eslint-disable-next-line no-alert
    const ok = window.confirm(
      `remove '${blogToRemove.title}' by ${blogToRemove.author}?`,
    );

    if (!ok) {
      return;
    }
    dispatch(deleteBlog(blogToRemove));
  };

  const likeBlog = (likedBlog) => {
    dispatch(voteBlog(likedBlog));
    dispatch(notify(`you liked '${likedBlog.title}' by ${likedBlog.author}`));
  };

  const addComment = (event) => {
    event.preventDefault();
    console.log('here');
    dispatch(commentBlog(blogToView, comment));
    dispatch(
      notify(`you commented on '${blogToView.title}' by ${blogToView.author}`),
    );
    setComment('');
  };

  return (
    <>
      <Typography variant="h5" sx={{ m: 2, ml: 0.5 }}>
        {blogToView.title}
      </Typography>
      <div>
        <Link to={blogToView.url}>{blogToView.url}</Link>
      </div>
      <div>
        {blogToView.likes} likes{' '}
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={() => likeBlog(blogToView)}
          sx={{ m: 2, ml: 0.5, mb: 0.5 }}
        >
          Like
        </Button>
      </div>
      {addedBy}
      {own && (
        <Button
          type="button"
          variant="contained"
          size="small"
          onClick={() => removeBlog(blogToView)}
          sx={{ m: 2, ml: 0.5, mb: 0.5 }}
        >
          Delete
        </Button>
      )}
      <Typography variant="h6" sx={{ m: 2, ml: 0.5 }}>
        Comments
      </Typography>
      <form onSubmit={addComment}>
        <TextField
          id="comment"
          label="Comment"
          fullWidth
          required
          variant="outlined"
          value={comment}
          size="small"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Add comment
        </Button>
      </form>
      <ul>
        {blogToView.comments.map((blogComment) => {
          return <li key={JSON.stringify(blogComment)}>{blogComment}</li>;
        })}
      </ul>
    </>
  );
}

export default Blog;
