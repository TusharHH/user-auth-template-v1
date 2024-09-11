import useAuthStore from '../actions/authStore';

const HomePage = () => {
  const { user, isAuthenticated, Logout } = useAuthStore();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <h1>You are not logged in.</h1>
      )}
    </div>
  );
};

export default HomePage;
