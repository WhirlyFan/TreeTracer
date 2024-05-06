import { useGetCurrentUserQuery, useLogoutMutation } from "app/apiSlice";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { data, isLoading, isError } = useGetCurrentUserQuery({});
  const [logout] = useLogoutMutation();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user</div>;

  const currentUser = data && data.user;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      {currentUser ? (
        <div>
          <h2>Welcome, {currentUser.username}</h2>
          <p>Your email is: {currentUser.email}</p>
          <button
            onClick={() => {
              logout({});
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Welcome, Guest</h2>
          <p>Please log in to see your profile</p>
          <button onClick={() => navigate("/login")}>Login</button>
        </div>
      )}
    </div>
  );
}
