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
  createAddress,
  checkout,
  selectAddress,
  deleteOrderItem,
  deleteOrderItems,
} from "./_lib/actions";

const Home = async function () {
  return (
    <form action={checkout}>
      <input type="hidden" name="userID" value="93" />
      <input type="hidden" name="productID" value="40" />
      <input type="hidden" name="orderItemID" value="18" />
      <input type="radio" name="preferedAddress" value="46" />
      <input type="radio" name="preferedAddress" value="51" />

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
