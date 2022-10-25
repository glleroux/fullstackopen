// import { createSlice } from '@reduxjs/toolkit';
// import blogService from '../services/blogs';

// const initialState = [
//   {
//     blogId: '6352db3694e214868f602145',
//     comment: "here's a test comment on one",
//   },
//   {
//     blogId: '6352db3694e214868f602145',
//     comment: 'and a second test comment',
//   },
//   {
//     blogId: '63530a4894e214868f60220d',
//     comment: "here's a test comment on another",
//   },
// ];

// export const commentSlice = createSlice({
//   name: 'comments',
//   initialState,
//   reducers: {
//     appendComment: (state, action) => state.push(action.payload),
//     clearNotification: () => null,
//   },
// });

// export const { appendComment } = commentSlice.actions;

// export default commentSlice.reducer;

// export const addComment = (comment) => {
//   return async (dispatch) => {
//     const newComment = await blogService.addComment(comment);
//     dispatch(appendComment(newComment));
//   };
// };
