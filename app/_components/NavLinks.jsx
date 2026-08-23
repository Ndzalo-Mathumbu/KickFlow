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
import Image from "next/image";
import { noAvatarIconDark } from "../_lib/helper";

const NavLinks = function () {
  const pathName = usePathname();
  return (
    <div className="flex gap-3 text-sm md:gap-6 md:text-lg items-center">
      {pathName !== "/trending" ? (
        <Link href="/trending" transitionTypes={["slide-in"]}>
          Trending
        </Link>
      ) : (
        ""
      )}
      {pathName !== "/new-arrivals" ? (
        <Link href="/new-arrivals" transitionTypes={["slide-in"]}>
          New Arrivals
        </Link>
      ) : (
        ""
      )}
      {pathName !== "/collections" ? (
        <Link href="/collections" transitionTypes={["slide-in"]}>
          Collections
        </Link>
      ) : (
        ""
      )}
      {pathName !== "/shop" ? (
        <Link href="/shop" transitionTypes={["slide-in"]}>
          Shop
        </Link>
      ) : (
        ""
      )}
      {pathName !== "/cart" ? (
        <Link
          className="flex gap-2 hover:underline-offset-2"
          href="/cart"
          transitionTypes={["slide-in"]}
        >
          Cart
        </Link>
      ) : (
        ""
      )}
      <div className="">
        <AccountDropDownMenu />
      </div>
    </div>
  );
};
export default NavLinks;
