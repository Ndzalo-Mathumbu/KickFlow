import {
  addToCart,
  createUser,
  createUsers,
  deleteUser,
  updateUser,
  updateUsers,
  createProduct,
} from "./_lib/actions";

const Home = async function () {
  return (
    <form action={createProduct}>
      <p>KickFlow</p>
      <button>change user</button>
    </form>
  );
};

export default Home;
