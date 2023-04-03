use wasm_bindgen::prelude::*;

// A very very simple oscillator
#[wasm_bindgen]
pub struct Oscillator {
    accumulator: u32,
}

#[wasm_bindgen]
impl Oscillator {
    pub fn new() -> Self {
        Self { accumulator: 0 }
    }

    pub fn process(&mut self, output: &mut [f32]) -> bool {
        for a in output {
            self.accumulator += 10;
            *a = (self.accumulator as f32 / 512.).sin() * 0.5;
        }

        true
    }
}
