import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? action.payload : anecdote,
      );
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const voteBlog = (blog) => {
  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: blog.user.id,
    likes: blog.likes + 1,
    id: blog.id,
  };

  return async (dispatch) => {
    const votedBlog = await blogService.update(blog.id, newBlog);
    dispatch(updateBlog(votedBlog));
  };
};

export const commentBlog = (blog, comment) => {
  console.log('reducer: ', blog);
  console.log('reducer: ', comment);
  return async (dispatch) => {
    const commentedBlog = await blogService.comment(blog.id, comment);
    dispatch(updateBlog(commentedBlog));
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(removeBlog(blog.id));
  };
};

export default blogSlice.reducer;
