"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Search from "./Searchbar";

const Header = function ({ className = "" }) {
  const pathName = usePathname();
  return (
    <header
      className={`flex h-20 items-center justify-between md:px-5 ${
        pathName === "/"
          ? "bg-transparent border-transparent"
          : "bg-(--color-surface-secondary) border-b border-(--color-border)"
      } ${className} `}
    >
      {pathName !== "/" || <Logo />}
      {/* <Logo /> */}
      {pathName !== "/" && <Search />}
      <Navigation />
    </header>
  );
};
export default Header;
