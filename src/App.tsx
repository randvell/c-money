import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AccountsPage from './pages/AccountsPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store/store';
import {useEffect} from 'react';
import {initStorage} from './store/auth/authSlice';
import AccountPage from './pages/AccountPage';

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      dispatch(initStorage());
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Routes>
        {/* Не придумал как сделать чтобы блоки в Main центрировались по какому-то условию внутри */}
        <Route element={<Layout centered={true} />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AccountsPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/accounts/:id" element={<AccountPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
