import { initSync, Oscillator } from "./wasm/rust_wasm";

class RustProcessor extends AudioWorkletProcessor {
  oscillator: Oscillator;

  constructor(options?: AudioWorkletNodeOptions) {
    super();

    // init the wasm module
    let { module } = options?.processorOptions;
    initSync(module);

    // construct an oscillator (in wasm)
    this.oscillator = Oscillator.new();
  }

  process(_inputs: Float32Array[][], outputs: Float32Array[][]) {
    for (let i = 0; i < outputs[0].length; i++) {
      this.oscillator.process(outputs[0][i]);
    }

    return true;
  }
}

registerProcessor("RustProcessor", RustProcessor);

// to make typescript happy
export type {}
