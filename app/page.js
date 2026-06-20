import {
  CreateUser,
  CreateUsers,
  DeleteUser,
  UpdateUser,
  UpdateUsers,
} from "./_lib/actions";

const Home = async function () {
  return (
    <form action={DeleteUser}>
      <p>KickFlow</p>
      <button>change user</button>
    </form>
  );
};

export default Home;
