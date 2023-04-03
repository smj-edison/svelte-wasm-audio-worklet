class SinProcessor extends AudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    for (let i = 0; i < outputs[0].length; i++) {
      for (let j = 0; j < outputs[0][i].length; j++) {
        outputs[0][i][j] = Math.sin(
          ((currentTime + j) * Math.PI * 2 * 440) / 44100
        );
      }
    }

    return true;
  }
}

registerProcessor("sin-processor", SinProcessor);

// to make typescript happy
export type {}
