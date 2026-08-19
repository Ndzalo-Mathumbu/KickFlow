"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = function () {
  const pathName = usePathname();
  return (
    <div className="flex items-center justify-between mt-7 h-11 bg-amber-900">
      {pathName !== "/" || <Logo />}
      {/* <Logo /> */}
      <Navigation />
    </div>
  );
};
export default Header;
