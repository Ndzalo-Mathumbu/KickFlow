"use client";
import {
  LucideShoppingBag,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Searchbar";
import { AccountDropDownMenu } from "./AccountDropdown";
import { useState } from "react";

const NavLinks = function () {
  const pathName = usePathname();
  const pathNameIshome = pathName === "/";
  return (
    <div className="flex  gap-6 text-lg">
      {!pathNameIshome && <Search />}

      <Link href="/trending" transitionTypes={["slide-in"]}>
        Trending
      </Link>
      <Link href="/new-arrivals" transitionTypes={["slide-in"]}>
        New Arrivals
      </Link>
      <Link href="/collections" transitionTypes={["slide-in"]}>
        Collections
      </Link>
      {pathName === "/shop" || (
        <Link href="/shop" transitionTypes={["slide-in"]}>
          Shop
        </Link>
      )}
      <Link
        className="flex gap-2 hover:underline-offset-2"
        href="/cart"
        transitionTypes={["slide-in"]}
      >
        Cart
      </Link>

      <AccountDropDownMenu />
    </div>
  );
};
export default NavLinks;
