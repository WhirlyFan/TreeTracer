import { useGetUsersQuery } from 'app/apiSlice';

export default function UsersList() {
  const { data, isLoading, isError } = useGetUsersQuery({});

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Not logged in</p>;
  }

  const userComponents = data.users.map((user: User) => {
    return (
      <li key={user.id}>
        <div>{user.username}</div>
      </li>
    );
  });

  type User = {
    id: number;
    username: string;
  };

  return (
    <>
      <h1>User List:</h1>
      <ul>{userComponents}</ul>
    </>
  );
}
