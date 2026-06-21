import {
  addToCart,
  createUser,
  createUsers,
  deleteUser,
  updateUser,
  updateUsers,
  createProduct,
  createProducts,
  deleteProducts,
  createCart,
} from "./_lib/actions";

const Home = async function () {
  return (
    <form action={addToCart}>
      <input type="hidden" name="test" value="86" />
      <input type="hidden" name="test2" value="20" />

      <p>KickFlow</p>
      <button>change user</button>
    </form>
  );
};

export default Home;
