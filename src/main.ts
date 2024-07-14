import init, { initSync, World } from "../rust/snake/pkg";

await init();

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
const CELLS = 8;
const idx = Date.now() % (CELLS * CELLS);

const world = World.new(CELLS, idx);
console.log(world, world.width());

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const cellSize = 40;
const width = world.width();
const height = world.width();

console.log({ cellSize, width, height });

const pxRatio = window.devicePixelRatio;

const w = width * cellSize;
const h = height * cellSize;

canvas.width = w * pxRatio;
canvas.height = h * pxRatio;
canvas.style.width = `${w}px`;
canvas.style.height = `${h}px`;

ctx.scale(pxRatio, pxRatio);

function drawGrid() {
  ctx.beginPath();
  for (let i = 0; i < width + 1; i++) {
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, h);
    for (let j = 0; j < height + 1; j++) {
      ctx.moveTo(0, j * cellSize);
      ctx.lineTo(w, j * cellSize);
    }
  }

  ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
  ctx.stroke();
}

console.log(world.snake_head_idx());
function drawSnake() {
  const snakeIdx = world.snake_head_idx();
  const col = snakeIdx % width;
  const row = Math.floor(snakeIdx / width);

  ctx.beginPath();
  ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
  ctx.stroke();
  ctx.fill();
}

function render() {
  ctx.clearRect(0, 0, w, h);
  world.update();
  drawGrid();
  drawSnake();
}

function frame() {
  render();
  setTimeout(frame, 250);
}

frame();
