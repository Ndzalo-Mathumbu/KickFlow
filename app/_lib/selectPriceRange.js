export const selectPriceRange = function (sneaker) {
  const prices = [...new Set(sneaker.map((a) => a.price))];
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 20000;
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  return { minPrice, maxPrice };
};
