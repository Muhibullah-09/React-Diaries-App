import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/rootreducer';

const Auth = lazy(() => import('../Features/auth/Auth'));
const Home = lazy(() => import('../Features/home/Home'));

const App: FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Suspense fallback={<p>Loading...</p>}>
            {isLoggedIn ? <Home /> : <Auth />}
          </Suspense>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;