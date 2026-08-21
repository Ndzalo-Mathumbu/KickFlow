/* import {

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
} from "../_lib/actions";

const Shop = async function () {
  return (
    <form action={deleteUser}>
      <input type="hidden" name="productID" value="18" />
      <input type="radio" name="preferedAddress" value="61" />
      <input type="radio" name="preferedAddress" value="62" />

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

export default Shop;
 */

import Header from "./Header";
import Sidebar from "./Sidebar";

const Shop = function () {
  return (
    <div>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt quibusdam
        fugiat sed nulla vitae deserunt esse est magnam quis quas veniam, error
        culpa expedita nesciunt facilis reiciendis nisi, laudantium sapiente.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt quibusdam
        fugiat sed nulla vitae deserunt esse est magnam quis quas veniam, error
        culpa expedita nesciunt facilis reiciendis nisi, laudantium sapiente.
      </p>
    </div>
  );
};

export default Shop;
