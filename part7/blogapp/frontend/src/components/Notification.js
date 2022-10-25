import { React } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@mui/material';

function Notification() {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return (
    <Alert severity="success" id="notification">
      {notification.message}
    </Alert>
  );
}

export default Notification;
