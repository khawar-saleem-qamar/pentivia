import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../App/userSlice'
import { useEffect } from 'react'
import "./styles/notifications.css"
import NotificationsContextProvider from '../App/notificationsContext.jsx';

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <NotificationsContextProvider>
      <div className="container-wrapper">
        {children}
      </div>
    </NotificationsContextProvider>
  )
};

export default PrivateRoute;
