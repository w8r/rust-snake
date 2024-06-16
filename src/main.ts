import x, { initSync, World } from "../rust/snake/pkg";

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

  const x1 = initSync(importObject);
  console.log({ x1 });

  const world = World.new(5, 5);
  console.log(world, world.width());
})();
