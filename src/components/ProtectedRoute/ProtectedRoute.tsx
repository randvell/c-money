import {useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {RootState} from '../../store/store';
import {useEffect} from 'react';

export const ProtectedRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const location = useLocation();

  console.log('token', token);
  console.log('path', location.pathname);

  useEffect(() => {
    if (!token && location.pathname !== '/auth') {
      navigate('/auth', {replace: true});
    }
  }, [token, location.pathname, navigate]);

  if (!token && location.pathname !== '/auth') {
    return null;
  }

  return <Outlet />;
};
