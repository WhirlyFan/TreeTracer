import NotFound from "components/NotFound";
import LoginForm from "components/auth/LoginForm";
import SignUpForm from "components/auth/SignupForm";
import NotYetImplemented from "components/NotYetImplemented";
import { Route, Routes } from "react-router-dom";
import { User } from "app/types";

export default function MainRoutes({ currentUser }: { currentUser: User }) {
  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/' element={<div>Home: {currentUser?.username}</div>} />
        <Route path='/settings' element={<NotYetImplemented />} />
        <Route path='/profile' element={<NotYetImplemented />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
