import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../App/userSlice'

const PrivateRoute = ({ children }) => {
  const user = useSelector(selectUser); // Adjust based on your userslice structure

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
