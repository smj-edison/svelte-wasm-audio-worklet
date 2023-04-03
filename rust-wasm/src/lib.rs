use wasm_bindgen::prelude::*;

// Let's implement a simple sine oscillator with variable frequency and volume.

#[wasm_bindgen]
pub struct Oscillator {
    frequency: u8,
    volume: u8,
    accumulator: u32,
}

#[wasm_bindgen]
impl Oscillator {
    pub fn new() -> Self {
        Self {
            frequency: 0,
            volume: 0,
            accumulator: 0,
        }
    }

    pub fn process(&mut self, output: &mut [f32]) -> bool {
        for a in output {
            self.accumulator += u32::from(self.frequency);
            *a = (self.accumulator as f32 / 512.).sin() * (self.volume as f32 / 100.);
        }

        true
    }

    pub fn pack(self) -> usize {
        Box::into_raw(Box::new(self)) as usize
    }

    pub unsafe fn unpack(val: usize) -> Self {
        *Box::from_raw(val as *mut _)
    }

    pub fn set_frequency(&mut self, frequency: u8) {
        self.frequency = frequency;
    }

    pub fn set_volume(&mut self, volume: u8) {
        self.volume = volume;
    }
}
