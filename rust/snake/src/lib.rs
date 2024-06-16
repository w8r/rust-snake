extern crate wasm_bindgen;
extern crate wee_alloc;

use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;

#[wasm_bindgen]
pub struct World {
    width: usize,
    height: usize,
    snake: Snake,
}


struct Snake {
    x: i32,
    y: i32,
    dx: i32,
    dy: i32,
    tail: Vec<(i32, i32)>,
}

impl Snake {
    fn new(width: usize, height: usize) -> Snake {
        Snake {
            x: width as i32 / 2,
            y: height as i32 / 2,
            dx: 0,
            dy: 0,
            tail: Vec::new(),
        }
    }

    fn update(&mut self) {
        self.x += self.dx;
        self.y += self.dy;
    }
}

#[wasm_bindgen]
impl World {
    pub fn new(width: usize, height: usize) -> World {
        World {
            width,
            height,
            snake: Snake::new(width, height),
        }
    }

    pub fn update(&mut self) {
        self.snake.update();
    }

    pub fn width(&self) -> usize {
        self.width
    }
}

// #[wasm_bindgen]
// pub fn printx(x: i32) -> i32 {
//     return x + 142;
// }

// #[wasm_bindgen]
// pub fn greet(str: &str) {
//     alert(str);
// }

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

// fn main() {
//     let str = "Hello, world!";
//     println!("{}", str);
// }
