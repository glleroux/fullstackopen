/* eslint-disable react/prop-types */
import { React } from 'react';
import { ListItemText } from '@mui/material';

function BlogTitle({ blog }) {
  return <ListItemText primary={blog.title} secondary={blog.author} />;
}

export default BlogTitle;
