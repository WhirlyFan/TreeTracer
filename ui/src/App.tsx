import "./App.less";
import Dashboard from "components/Dashboard";
import { useGetCurrentUserQuery } from "app/apiSlice";
import { Route, Routes } from "react-router-dom";
import LoginForm from "components/auth/LoginForm";
import SignUpForm from "components/auth/SignupForm";
import Users from "components/Users";
import HomePage from "components/HomePage";
import NotFound from "components/NotFound";

function App() {
  const { data, isLoading, isError } = useGetCurrentUserQuery({});

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user</div>;

  const currentUser = data && data.user;

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/users' element={<Users />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={currentUser ? <Dashboard /> : <HomePage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
