import { toast } from 'react-toastify';

export const notify = (callId, msg, timex) => {
  if (callId === 'noUser') {
    return toast.error(msg, { position: toast.POSITION.TOP_CENTER, autoClose: timex });
  }
  if (callId === 'redirect') {
    return toast.info(msg, { position: toast.POSITION.TOP_RIGHT, autoClose: timex });
  }
};

export const checkUser = () => {
  if (!localStorage.getItem('currentUser')) {
    notify('noUser', "Please Login First", 1000);
    notify('redirect', "You will be redirected to Login Page", 2000);
    setTimeout(() => window.location.href = '/login', 6000);
    return false;
  }
  return true;
};

export const checkLoggedAsAdmin = () => {
  if (localStorage.getItem('currentAdmin')) {
    setTimeout(() => window.location.href = '/', 3000);
    notify('noUser', "You are logged in as admin", 2000);
    return true;
  }
  return false;
};
