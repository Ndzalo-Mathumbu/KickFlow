"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";

const AppLayout = function ({ children }) {
  const pathName = usePathname();

  if (pathName === "/") {
    return children;
  }

  return (
    <div className="grid min-h-screen grid-cols-[16rem_minmax(0,1fr)] grid-rows-[80px_minmax(0,1fr)]">
      <Sidebar className="row-span-2" />
      <Header className="col-start-2 row-start-1 " />
      <Main className="col-start-2 row-start-2 bg-(--color-background) p-5 ">
        {children}
      </Main>
    </div>
  );
};
export default AppLayout;
