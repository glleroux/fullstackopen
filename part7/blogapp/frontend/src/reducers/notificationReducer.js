import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

let timerID;

export const notify = (message, type = 'info') => {
  return (dispatch) => {
    dispatch(setNotification({ type, message }));
    clearTimeout(timerID);
    timerID = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};
