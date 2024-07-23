// import style from './AuthPage.module.scss';

import {useSelector} from 'react-redux';
import LoginForm from '../../components/Main/LoginForm';
import {RootState} from '../../store/store';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

export const AuthPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token && path === '/auth') {
      navigate('/accounts/ooooo', {replace: true});
    }
  }, [token, path, navigate]);

  if (token) {
    return null;
  }

  return <LoginForm />;
};
