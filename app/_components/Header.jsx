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
      {pathName !== "/" && (
        <Search
          searchIconHover="hover:scale-105 transition-transform duration-200"
          placeholder="Search..."
          className={`w-[28vw] p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder)  focus:ring-0 focus:outline-none rounded-sm `}
        />
      )}
      <Navigation />
    </header>
  );
};
export default Header;
