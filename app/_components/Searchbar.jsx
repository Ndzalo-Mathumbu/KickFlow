"use client";
import { Autocomplete } from "@base-ui/react";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Search = function ({
  useAutocomplete = false,
  useSidebarSearchbars = false,
  sidebarAccordionAutocomplete,
  className,
  placeholder,
  searchIconHover,
}) {
  const [findSenaker, setFindSneaker] = useState("");
  const [sneakerAutocomplete, setSneakerAutocomplete] = useState([]);

  console.log(findSenaker);

  useEffect(() => {
    const getSearchedSneaker = async function () {
      if (!findSenaker.trim()) return;
      const res = await fetch(
        `/api/searchedSneakers?user-search=${encodeURIComponent(findSenaker)}`,
      );
      const data = await res.json();
      console.log(data, `good`);
    };

    const getAllSneakers = async function () {
      const res = await fetch(`/api/products`);
      const data = await res.json();
      setSneakerAutocomplete((a) => (a = data));
      console.log(data, `121212121`);
    };

    getSearchedSneaker();
    getAllSneakers();
  }, [findSenaker]);

  const Input = useAutocomplete ? Autocomplete.Input : "input";
  //  const sidebarSearchWindow = useSidebarSearchbars&&

  const seenAutocompleteLabels = new Set();
  const uniqueSneakerAutocomplete = sneakerAutocomplete.filter((sneaker) => {
    const label = useSidebarSearchbars ? sneaker.brand : sneaker.name;
    const normalizedLabel = label?.trim().toLocaleLowerCase();

    if (!normalizedLabel || seenAutocompleteLabels.has(normalizedLabel)) {
      return false;
    }

    seenAutocompleteLabels.add(normalizedLabel);
    return true;
  });

  return (
    <>
      <div>
        <div className={`relative  ${searchIconHover}`}>
          <SearchIcon
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-(--color-surface-secondaryTwo) w-4 h-4`}
          />
          <Autocomplete.Root items={uniqueSneakerAutocomplete}>
            {/* The field where the user types their search. */}

            <Input
              type="text"
              value={findSenaker}
              onChange={(e) => setFindSneaker(e.target.value)}
              placeholder={`${placeholder}`}
              className={`${className}  pl-9 placeholder:text-( --color-input-placeholder)`}
            />
            {/* Renders the suggestions in a portal, outside the normal layout. */}
            <Autocomplete.Portal>
              {/* Positions the dropdown relative to the input. */}
              <Autocomplete.Positioner
                sideOffset={4}
                side="bottom"
                collisionAvoidance={{
                  side: "none",
                  align: "none",
                  fallbackAxisSide: "none",
                }}
                className={
                  useSidebarSearchbars
                    ? `${sidebarAccordionAutocomplete} bg-(--color-surface-card)`
                    : `bg-(--color-surface-card) text-(--color-text-secondary) w-[28vw]  max-h-40  h-auto overflow-y-auto overflow-x-hidden rounded-sm  py-1.5 `
                }
              >
                {/* The visible dropdown containing the suggestions. */}
                <Autocomplete.Popup
                  className={useSidebarSearchbars ? "w-full" : undefined}
                >
                  {/* Displayed when no options match the user's search. */}
                  <Autocomplete.Empty>
                    <div>No results found.</div>
                  </Autocomplete.Empty>

                  {/* Renders the filtered list of matching options. */}
                  <Autocomplete.List>
                    {(sneaker) => (
                      <Autocomplete.Item
                        key={sneaker.id}
                        value={sneaker}
                        className="border-b-2 border-(--color-border-strong) py-2 px-5 hover:scale-105 hover:bg-(--color-border-strong) transition-all duration-200 ease-in-out cursor-pointer"
                      >
                        {/* The text displayed for this suggestion. */}
                        <div className="flex gap-4">
                          <Image
                            alt={`${sneaker.name} IMG`}
                            src={sneaker.image.at(0)}
                            width={30}
                            height={30}
                          />
                          {useSidebarSearchbars ? sneaker.brand : sneaker.name}
                        </div>
                      </Autocomplete.Item>
                    )}
                  </Autocomplete.List>
                </Autocomplete.Popup>
              </Autocomplete.Positioner>
            </Autocomplete.Portal>
          </Autocomplete.Root>
        </div>
      </div>
    </>
  );
};

export default Search;
