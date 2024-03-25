import x, { initSync, printx } from "../rust/snake/pkg";

(async () => {
  const c = await x();
  console.log(c.printx(5));
})();
