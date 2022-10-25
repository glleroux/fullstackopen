/* eslint-disable react/prop-types */
import { React, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@mui/material';
import { createBlog } from '../reducers/blogReducer';
import { notify } from '../reducers/notificationReducer';

function NewBlogForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      dispatch(createBlog({ title, author, url, likes: 0 }));
      dispatch(notify(`a new blog '${title}' by ${author} added`));
      setAuthor('');
      setTitle('');
      setUrl('');
    } catch (error) {
      notify(`creating a blog failed: ${error.response.data.error}`, 'alert');
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ m: 2, ml: 0.5 }}>
        Add new blog
      </Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="title"
            label="Blog title"
            required
            fullWidth
            variant="outlined"
            value={title}
            size="small"
            onChange={({ target }) => setTitle(target.value)}
            sx={{ m: 0.5 }}
          />
        </div>
        <div>
          <TextField
            id="author"
            label="Blog author"
            required
            fullWidth
            variant="outlined"
            value={author}
            size="small"
            onChange={({ target }) => setAuthor(target.value)}
            sx={{ m: 0.5 }}
          />
        </div>
        <div>
          <TextField
            id="url"
            label="Blog link"
            required
            fullWidth
            variant="outlined"
            value={url}
            size="small"
            onChange={({ target }) => setUrl(target.value)}
            sx={{ m: 0.5 }}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{ m: 2, ml: 0.5, mb: 0.5 }}
        >
          create
        </Button>
      </form>
    </div>
  );
}

export default NewBlogForm;
