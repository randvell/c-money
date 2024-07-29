import {useSelector} from 'react-redux';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {RootState} from '../../store/store';
import {useEffect} from 'react';
import {ActionState} from '../../store/cont';

export const ProtectedRoute: React.FC = () => {
  const {status} = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/auth' && status === ActionState.Failed) {
      navigate('/auth', {replace: true});
    }
  }, [status, location.pathname, navigate]);

  if (ActionState.Succeeded) {
    return <Outlet />;
  }

  return null;
};
