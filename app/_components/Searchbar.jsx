"use client";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Search = function ({ className, placeholder, searchIconHover }) {
  const [findSenaker, setFindSneaker] = useState("");

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
    getSearchedSneaker();
  }, [findSenaker]);
  return (
    <div className={`relative  ${searchIconHover}`}>
      <SearchIcon
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-(--color-surface-secondaryTwo) w-4 h-4 `}
      />
      <input
        type="text"
        value={findSenaker}
        onChange={(e) => setFindSneaker(e.target.value)}
        placeholder={`${placeholder}`}
        className={`${className}  pl-9 placeholder:text-( --color-input-placeholder)`}
      />
    </div>
  );
};
export default Search;
