import { SearchIcon } from "lucide-react";

const Search = function ({ className, placeholder, searchIconHover }) {
  return (
    <div className={`relative  ${searchIconHover}`}>
      <SearchIcon
        className={`absolute left-3 top-1/2 -translate-y-1/2 text-(--color-surface-secondaryTwo) w-4 h-4 `}
      />
      <input
        type="text"
        placeholder={`${placeholder}`}
        className={`${className}  pl-9 placeholder:text-( --color-input-placeholder)`}
      />
    </div>
  );
};
export default Search;
