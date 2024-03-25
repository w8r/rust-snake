extern crate wasm_bindgen;


use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn printx(x: i32) -> i32 {
    return x + 42;
}

fn main() {
    let str = "Hello, world!";
    println!("{}", str);
}
