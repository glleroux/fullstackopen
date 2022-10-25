import { React, useRef } from 'react';
import { useSelector } from 'react-redux';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import BlogTitle from './BlogTitle';
import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';

function Blogs() {
  const blogFormRef = useRef();

  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes),
  );
  const user = useSelector((state) => state.user);

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm />
      </Togglable>

      <List id="blogs">
        {blogs.map((blog) => (
          <Link to={`/blogs/${blog.id}`}>
            <ListItem>
              <BlogTitle key={blog.id} blog={blog} user={user} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}

export default Blogs;
