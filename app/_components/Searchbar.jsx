const Search = function () {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="w-[28vw] p-1 bg-(--color-input-background) border-(color-input-border) border text-(--color-input-text) placeholder:text-(--color-input-placeholder) hover:scale-105 transition-transform duration-200 focus:ring-0 focus:outline-none rounded-sm "
    />
  );
};
export default Search;
