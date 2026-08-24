"use client";
import Image from "next/image";
import { KickflowDarkModeIcon, KickflowDarkModeLogo } from "../_lib/helper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/UI/accordion";
import { ArrowDownWideNarrow } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Sidebar = function ({ className = "" }) {
  const [sidebarWidth, setSidebarWidth] = useState(null);
  const sidebarRef = useRef(null);
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const observer = new ResizeObserver((e) => {
      const width = e.at(0).contentRect.width;
      setSidebarWidth((a) => (a = width));
    });
    observer.observe(sidebar);
    return () => observer.disconnect();
  }, []);

  console.log(sidebarWidth, "sidebar width");

  return (
    <aside
      ref={sidebarRef}
      className={`h-full bg-(--color-surface-secondary) overflow-hidden border-(--color-border) border-r ${className} flew flex-col items-center`}
    >
      <Image
        src={KickflowDarkModeIcon}
        alt="KickFlow Icon"
        width={400}
        height={400}
        quality={100}
        className="scale-[1.5] mt-6"
      />

      <div
        className={`my-12 mx-3 bg-(--color-surface-card)/90 px-3 rounded-md ${sidebarWidth <= 144 ? `invisible` : ``}`}
      >
        <p className="text-lg">Explore 500 Sneakers</p>
      </div>
      <div
        className={`flex  items-center justify-between  px-3 py-3 border-t   border-b-0  border-l-0  border-r-0 border-4 border-(--color-border-strong) ${sidebarWidth <= 144 ? `invisible` : ``} `}
      >
        <p className="flex">
          FILTERS <ArrowDownWideNarrow />
        </p>
        <p>Clear</p>
      </div>
      <div
        className={`border border-t border-b mt-6 border-r-0 border-l-0 border-(--color-border) bg-(--color-surface-card) ${sidebarWidth <= 144 ? `invisible` : ``} `}
      >
        <Accordion /* defaultValue={["categories"]} */ className="px-3">
          <AccordionItem value="categories">
            <AccordionTrigger className="text-lg">Categories</AccordionTrigger>
            <AccordionContent className="text-(--color-text-secondary)">
              We offer standard (5-7 days), express (2-3 days), and overnight
              shipping. Free shipping on international orders.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};
export default Sidebar;
