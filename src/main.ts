import x, { initSync, printx, greet } from "../rust/snake/pkg";

(async () => {
  const c = await x();
  console.log(c);

  const memory = new WebAssembly.Memory({ initial: 1 });
  const importObject = {
    js: {
      memory,
    },
    console: {
      log: (x: number) => console.log(x),
      error: (x: number) => console.error(x),
    },
  };

  const { printx } = initSync(importObject);
  printx(42);
  console.log(greet("pidor"));
})();
