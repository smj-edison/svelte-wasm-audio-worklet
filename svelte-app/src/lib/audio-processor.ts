import { initSync, type InitOutput, Oscillator } from "./wasm/rust_wasm";

class RustProcessor extends AudioWorkletProcessor {
  instance: InitOutput;
  oscillator: Oscillator;

  constructor(options?: AudioWorkletNodeOptions) {
    super();

    let { module } = options?.processorOptions;
    let instance = initSync(module);

    this.instance = instance;
    this.oscillator = Oscillator.new();
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    for (let i = 0; i < outputs[0].length; i++) {
      this.oscillator.process(outputs[0][i]);
    }

    return true;
  }
}

registerProcessor("RustProcessor", RustProcessor);

// to make typescript happy
export type {}
