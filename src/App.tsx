import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AccountsPage from './pages/AccountsPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Не придумал как сделать чтобы блоки в Main центрировались только в каком-то месте */}
        <Route element={<Layout centered={true} />}>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/accounts" element={<AccountsPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
