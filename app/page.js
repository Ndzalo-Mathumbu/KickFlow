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
  checkOut,
  selectAddress,
} from "./_lib/actions";

const Home = async function () {
  return (
    <form action={selectAddress}>
      <input type="hidden" name="test" value="119" />
      <input type="hidden" name="test2" value="60" />
      <input type="radio" name="preferedAdress" value="29" />
      <input type="radio" name="preferedAdress" value="33" />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Enter your country"
      />
      <label htmlFor="city">city</label>
      <input type="text" id="city" name="city" placeholder="Enter your city" />
      <label htmlFor="street">street</label>
      <input
        type="text"
        id="street"
        name="street"
        placeholder="Enter your street"
      />
      <label htmlFor="postalCode">postalCode</label>
      <input
        type="number"
        id="postalCode"
        name="postalCode"
        placeholder="Enter your postalCode"
      />

      <p>KickFlow</p>
      <button>change</button>
    </form>
  );
};

export default Home;
