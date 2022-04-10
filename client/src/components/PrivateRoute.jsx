import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = () => {
  const { isLoading, isLoggedIn } = useSelector((state) => state.auth);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
