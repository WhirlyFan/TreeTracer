import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from 'views/Layout/Dashboard';
import Landing from 'views/Landing/Landing';
import LoginForm from 'components/auth/LoginForm';
import UsersList from 'components/UsersList';
import SignUpForm from 'components/auth/SignUpForm';
import NotFound from 'components/NotFound';
import Navbar from 'components/NavBar/NavBar';
import { useGetCurrentUserQuery } from 'app/apiSlice';

function App() {
  const { data: { user } = {}, isLoading } = useGetCurrentUserQuery({});

  const authRoutes = (
    <>
      <Route path="/users" element={<UsersList />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </>
  );

  // TODO: Change this so it doesn't display null.
  // The reason it's null is because we're avoiding the LoginForm at "/*".
  // It causes a blank screen to flash on every refresh which is bad UX.
  // However, if we don't it'll flash the login form on every refresh.
  if (isLoading) {
    return null;
  }

  // TODO: Change this so Navbar isn't written multiple times.
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar user={user} userLoading={isLoading} />
              <Landing />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Navbar user={user} userLoading={isLoading} />
              <LoginForm />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <Navbar user={user} userLoading={isLoading} />
              <SignUpForm />
            </>
          }
        />
        {user ? (
          authRoutes
        ) : (
          <Route
            path="/*"
            element={
              <>
                <Navbar user={user} userLoading={isLoading} />
                <LoginForm />
              </>
            }
          />
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
