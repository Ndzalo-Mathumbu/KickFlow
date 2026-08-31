"use client";
import Image from "next/image";
import { KickflowDarkModeIcon, KickflowDarkModeLogo } from "../_lib/helper";
import { ArrowDownWideNarrow } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Skeleton } from "./UI/skeleton";
import SidebarShopAccordion from "./SidebarShopAccordion";
import SidebarShopAccordionSkeleton from "./SidebarShopAccordionSkeleton";
import { selectPriceRange } from "../_lib/selectPriceRange";
import { useParams, useSearchParams } from "next/navigation";

const Sidebar = function ({ className = "" }) {
  const [sidebarWidth, setSidebarWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingKickFlowIcon, setIsLoadingKickFlowIcon] = useState(true);
  const [sneaker, setSneaker] = useState([]);
  const [filteredSneaker, setFilteredSneakerSneaker] = useState([]);

  const { minPrice, maxPrice } = selectPriceRange(sneaker);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  const sidebarRef = useRef(null);
  const search = useSearchParams();
  const urlQueryString = search.toString();

  useEffect(() => {
    if (KickflowDarkModeIcon) {
      setIsLoadingKickFlowIcon(false);
    }

    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    const observer = new ResizeObserver((e) => {
      const width = e.at(0).contentRect.width;
      setSidebarWidth((a) => (a = width));
    });

    observer.observe(sidebar);

    const getProductsData = async function () {
      const res = await fetch(`/api/products`);

      const data = await res.json();

      setSneaker(data);
      setIsLoading(false);
    };

    const getFilteredProductsData = async function () {
      const res = await fetch(`/api/filteredProducts?${urlQueryString}`);

      const data = await res.json();

      setFilteredSneakerSneaker(data);
      setIsLoading(false);
    };
    urlQueryString ? getFilteredProductsData() : setFilteredSneakerSneaker([]);
    getProductsData();
    return () => observer.disconnect();
  }, [urlQueryString]);

  console.log(sneaker, `Not filtered Sneaker`);
  console.log(filteredSneaker, `filtered sneaker`);

  const brands = [...new Set(sneaker.map((a) => a.brand))];
  const categories = [...new Set(sneaker.map((a) => a.category))];
  const colour = [...new Set(sneaker.map((a) => a.color))];
  const sneakerSizes = sneaker
    .map((a) => a.size)
    .concat()
    .flat()
    .sort((a, b) => a - b);
  const size = [...new Set(sneakerSizes.map((a) => a))];
  const availability = [...new Set(sneaker.map((a) => a.stock))];

  return (
    <aside
      ref={sidebarRef}
      className={`h-full  bg-(--color-surface-secondary) custom-scrollbar overflow-hidden border-(--color-border) border-r ${className} flex flex-col items-center`}
    >
      {isLoadingKickFlowIcon ? (
        <Skeleton
          className={`scale-[1.5] mt-6 h-[10vh] w-50 place-content-center bg-(--color-skeleton) `}
        />
      ) : (
        <Image
          href="/"
          src={KickflowDarkModeIcon}
          alt="KickFlow Icon"
          width={400}
          height={400}
          quality={100}
          className="scale-[1.5] mt-6"
        />
      )}

      <>
        {isLoading ? (
          <div
            className={`my-12   w-[calc(100%-4rem)] rounded-md flex items-center justify-center h-8 bg-(--color-skeleton) ${filteredSneaker.length === 0 ? `hidden` : ``}`}
          >
            <Skeleton
              className={`w-[90%] h-5 bg-(--color-skeleton-inner) `}
            ></Skeleton>
          </div>
        ) : (
          <div
            className={`mt-12 flex items-center justify-center w-[calc(100%-4rem)] bg-(--color-surface-card)/90 px-3 rounded-md ${sidebarWidth <= 144 ? `invisible` : ``} 
             ${filteredSneaker.length === 0 ? "hidden " : ""} `}
          >
            <p className="text-lg">{`Explore ${filteredSneaker.length} Sneakers`}</p>
          </div>
        )}

        {isLoading ? (
          <div
            className={`my-12 w-[calc(100%-4rem)] rounded-md flex items-center justify-center h-8 bg-(--color-skeleton)  ${filteredSneaker.length > 0 ? `relative bottom-6 mt-2` : ``}`}
          >
            <Skeleton
              className={`w-[90%] h-5 bg-(--color-skeleton-inner) `}
            ></Skeleton>
          </div>
        ) : (
          <div
            className={`my-12 flex items-center justify-center w-[calc(100%-4rem)] bg-(--color-surface-card)/90 px-3 rounded-md ${sidebarWidth <= 144 ? `invisible` : ``}`}
          >
            <p className="text-lg">{`${sneaker.length} Sneakers Available`}</p>
          </div>
        )}

        <>
          {isLoading ? (
            <div
              className={`w-full mb-6 h-[8vh] rounded-none bg-(--color-skeleton) flex items-center justify-between px-3`}
            >
              <Skeleton
                className={`w-15 rounded-md h-6  bg-(--color-skeleton-inner) `}
              />
              <Skeleton
                className={`w-15 rounded-md h-6 bg-(--color-skeleton-inner) `}
              />
            </div>
          ) : (
            <div
              className={`flex  items-center justify-between w-full px-3  py-3 border-t   border-b-0  border-l-0  border-r-0 border-4 border-(--color-border-strong) ${sidebarWidth <= 144 ? `opacity-0 transition-opacity duration-200` : ``} `}
            >
              <p className="flex">
                FILTERS <ArrowDownWideNarrow />
              </p>
              <p>Clear</p>
            </div>
          )}
        </>
      </>

      {isLoading ? (
        <SidebarShopAccordionSkeleton />
      ) : (
        <div
          className={`border border-t border-b mt-6 border-r-0 border-l-0 border-(--color-border) bg-(--color-surface-card) ${sidebarWidth <= 144 ? `opacity-0 transition-opacity duration-200` : ``} overflow-y-auto w-full`}
        >
          <SidebarShopAccordion
            brands={brands}
            colour={colour}
            categories={categories}
            size={size}
            isLoading={isLoading}
            priceRange={priceRange}
            onPriceRange={setPriceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            availability={availability}
          />
        </div>
      )}
    </aside>
  );
};
export default Sidebar;
