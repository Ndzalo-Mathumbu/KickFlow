import { getProducts } from "../_lib/data-service";

export const Tester = async function () {
  const s = await getProducts();
  return <button onClick={s}>test here</button>;
};
