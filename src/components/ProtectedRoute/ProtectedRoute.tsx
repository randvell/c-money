import {useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {RootState} from '../../store/store';
import {useEffect} from 'react';

export const ProtectedRoute: React.FC = () => {
  const {token, status} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      !token &&
      location.pathname !== '/auth' &&
      ['succeeded', 'failed'].includes(status)
    ) {
      navigate('/auth', {replace: true});
    }
  }, [token, status, location.pathname, navigate]);

  if (!token && location.pathname !== '/auth') {
    return null;
  }

  return <Outlet />;
};
