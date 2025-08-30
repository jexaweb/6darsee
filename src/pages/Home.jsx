import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div>
      <h1>Hello - {user.displayName} </h1>
      {error && <div>{error}</div>}
      {!isPending && <button onClick={_logout}>Logout</button>}
      {isPending && <button disabled>Loading...</button>}
    </div>
  );
}

export default Home;
