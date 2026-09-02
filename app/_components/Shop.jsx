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

import { ArrowDownUp } from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Shop = function () {
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="bg-(--color-surface-secondaryTwo)/45 border-[1.8px] border-(--color-border) w-[12vw] h-[5vh] flex items-center justify-center text-(--color-text-secondary)">
        <p className="flex">Filters Applied: 6</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="bg-(--color-surface-secondaryTwo)/45 border-[1.8px] border-(--color-border) w-[8vw] h-[5vh] flex items-center justify-center text-(--color-text-secondary)">
          <p className="flex items-center gap-3">
            {" "}
            Sort By <ArrowDownUp />
          </p>
        </div>

        <div className="bg-(--color-surface-secondaryTwo)/45 border-[1.8px] border-(--color-border)  w-[25vw] h-[5vh] flex items-center justify-center  divide-x divide-(--color-border) text-(--color-text-secondary)">
          <p className="px-4 cursor-pointer transition-transform duration-150 hover:bg-(--color-surface-hover)">
            Featured
          </p>
          <p className="px-4 transition-transform duration-150 hover:bg-(--color-surface-hover) cursor-pointer">
            Newest
          </p>
          <p className="px-4 transition-transform duration-150 hover:bg-(--color-surface-hover) cursor-pointer">
            Most Popular
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
