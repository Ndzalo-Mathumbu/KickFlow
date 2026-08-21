"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Search from "./Searchbar";

const Header = function ({ className = "" }) {
  const pathName = usePathname();
  return (
    <header
      className={`flex h-20 items-center justify-between bg-(--color-surface-secondary) px-5 border-b border-(--color-border) ${className}`}
    >
      {pathName !== "/" || <Logo />}
      {/* <Logo /> */}
      {pathName !== "/" && <Search />}
      <Navigation />
    </header>
  );
};
export default Header;
