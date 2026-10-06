"use client";

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

import { ArrowDownUp, TrendingDown, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./UI/dropdown-menu";
import { useShopStore } from "../_lib/Stores/shop-store";
import { useSearchParams } from "next/navigation";

const Shop = function () {
  const search = useSearchParams(window.location.search);

  const numFilters =
    search.getAll(`brand`).length +
    search.getAll(`colour`).length +
    search.getAll(`category`).length +
    search.getAll(`size`).length +
    search.getAll(`price`).length +
    search.getAll(`stock`).length +
    search.getAll(`sale`).length +
    search.getAll(`min_price`).length +
    search.getAll(`max_price`).length;

  const numFiltersArray = [numFilters];

  const filteredSneakers = useShopStore((state) => state.sneakers);
  const setSneakers = useShopStore((state) => state.setSneakers);

  const handleLowToHighPrice = function () {
    setSneakers(
      [...filteredSneakers].sort((a, b) => Number(a.price) - Number(b.price)),
    );
    console.log(filteredSneakers);
  };

  const handleHighToLowPrice = function () {
    setSneakers(
      [...filteredSneakers].sort((a, b) => Number(b.price) - Number(a.price)),
    );
    console.log(filteredSneakers);
  };
  return (
    <div className="flex items-center justify-between mt-8">
      <div className="bg-(--color-surface-secondaryTwo)/45 border-[1.8px] border-(--color-border) w-[12vw] h-[5vh] flex items-center justify-center text-(--color-text-secondary)">
        <p className="flex">Filters Applied: {numFiltersArray}</p>
      </div>

      <div className="flex items-center gap-5">
        <div className="bg-(--color-surface-secondaryTwo)/45 border-[1.8px] border-(--color-border) w-[8vw] h-[5vh] flex items-center justify-center text-(--color-text-secondary)">
          <p className="flex items-center gap-3">
            {" "}
            Sort By <ArrowDownUp />
          </p>
        </div>

        <div className="bg-(--color-surface-secondaryTwo)/45 border-[1.8px] border-(--color-border)  w-[42vw] h-[5vh] flex items-center justify-center  divide-x divide-(--color-border) text-(--color-text-secondary)">
          <p className="px-4 cursor-pointer transition-transform duration-150 hover:bg-(--color-surface-hover)">
            Featured
          </p>
          <p className="px-4 transition-transform duration-150 hover:bg-(--color-surface-hover) cursor-pointer">
            Newest
          </p>
          <p className="px-4 transition-transform duration-150 hover:bg-(--color-surface-hover) cursor-pointer">
            Most Popular
          </p>
          <p className="px-4 transition-transform duration-150 hover:bg-(--color-surface-hover) cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger openOnHover closeDelay={200}>
                Price
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="rounded-sm border border-border bg-popover text-popover-foreground mt-2"
              >
                <DropdownMenuItem
                  onClick={handleLowToHighPrice}
                  className="hover:rounded-sm hover:scale-105 transition-transform duration-200"
                >
                  <TrendingUp color="var(--color-brand)" />
                  Low &rarr; High
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={handleHighToLowPrice}
                  className="hover:rounded-none hover:scale-105 transition-transform duration-200"
                >
                  <TrendingDown color="var(--color-brand)" />
                  High &larr; Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </p>
          <p className="px-4 transition-transform duration-150 hover:bg-(--color-surface-hover) cursor-pointer">
            Biggest Discount
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
