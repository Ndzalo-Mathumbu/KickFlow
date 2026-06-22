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
  createCartItems,
  deleteCartItems,
} from "./_lib/actions";

const Home = async function () {
  return (
    <form action={deleteCartItems}>
      <input type="hidden" name="test" value="90" />
      <input type="hidden" name="test2" value="36" />

      <p>KickFlow</p>
      <button>change user</button>
    </form>
  );
};

export default Home;
