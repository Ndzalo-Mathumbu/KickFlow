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
import Search from "./Searchbar";
import { Checkbox } from "@/app/_components/UI/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/app/_components/UI/field";

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
        <Accordion /* defaultValue={["Brands"]} */ className="px-3">
          <AccordionItem value="Brands">
            <AccordionTrigger className="text-lg">Brands</AccordionTrigger>
            <AccordionContent className="text-(--color-text-secondary)">
              <Search
                searchIconHover="hover:scale-[1.01] transition-transform duration-200 "
                placeholder="Search brands..."
                className={`w-full p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) focus:ring-0 focus:outline-none rounded-sm `}
              />
              <FieldSet className="">
                <FieldGroup className="gap-3">
                  <FieldDescription className="pt-4 text-(--color-text-muted)">
                    Select Brands
                  </FieldDescription>
                  <Field
                    orientation="horizontal"
                    className=" relative bottom-3"
                  >
                    <Checkbox id="brands" name="brands" /* defaultChecked */ />
                    <FieldLabel
                      htmlFor="brands"
                      className={`text-(--color-text-secondary)`}
                    >
                      Hard disks
                    </FieldLabel>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
};
export default Sidebar;
