extern crate wasm_bindgen;
extern crate wee_alloc;

use wasm_bindgen::prelude::*;
use wee_alloc::WeeAlloc;

#[global_allocator]
static ALLOC: WeeAlloc = WeeAlloc::INIT;


#[wasm_bindgen]
pub fn printx(x: i32) -> i32 {
    return x + 142;
}

#[wasm_bindgen]
pub fn greet(str: &str) {
    alert(str);
}

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

fn main() {
    let str = "Hello, world!";
    println!("{}", str);
}
