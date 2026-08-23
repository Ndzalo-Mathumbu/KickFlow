"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Main from "./Main";
import Sidebar from "./Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./UI/resizable";

const AppLayout = function ({ children }) {
  const pathName = usePathname();

  if (pathName === "/") {
    return children;
  }

  return (
    <div className="grid min-h-screen ">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize="23%" minSize={50} maxSize={320}>
          <Sidebar className="row-span-2" />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="77%">
          <Header className="col-start-2 row-start-1 " />
          <Main className="col-start-2 row-start-2 bg-(--color-background) p-5 ">
            {children}
          </Main>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default AppLayout;
