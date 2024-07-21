// import style from './AuthPage.module.scss';

import {useSelector} from 'react-redux';
import LoginForm from '../../components/Main/LoginForm';
import {RootState} from '../../store/store';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

export const AuthPage = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/accounts', {replace: true});
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return <LoginForm />;
};
