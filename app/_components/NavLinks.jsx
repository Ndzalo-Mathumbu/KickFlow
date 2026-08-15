import {
  LucideShoppingBag,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasket,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

const NavLinks = function () {
  return (
    <div className="flex  gap-6 text-lg">
      <Link href="/wishlist" transitionTypes={["slide-in"]}>
        Wishlist
      </Link>
      <Link href="/trending" transitionTypes={["slide-in"]}>
        Trending
      </Link>
      <Link href="/new-arrivals" transitionTypes={["slide-in"]}>
        New Arrivals
      </Link>
      <Link href="/collections" transitionTypes={["slide-in"]}>
        Collections
      </Link>
      <Link
        className="flex gap-2 hover:underline-offset-2"
        href="/cart"
        transitionTypes={["slide-in"]}
      >
        Cart <ShoppingBag />
      </Link>
      <Link
        className="flex gap-2 hover:underline-offset-2"
        href="/sign-up"
        transitionTypes={["slide-in"]}
      >
        Create Account <UserPlus />
      </Link>
    </div>
  );
};
export default NavLinks;
