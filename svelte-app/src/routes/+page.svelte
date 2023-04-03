<script lang="ts">
    import { onMount } from "svelte";

    import rustProcessorUrl from "$lib/audio-processor.ts?url";
    import wasmUrl from "$lib/wasm/rust_wasm_bg.wasm?url";

    let wasmModulePromise: Promise<ArrayBuffer>;

    // start loading the wasm module immediately
    onMount(() => {
        wasmModulePromise = fetch(wasmUrl).then((res) => res.arrayBuffer());
    });

    async function start() {
        const audioContext = new AudioContext();

        // register the processor
        await audioContext.audioWorklet.addModule(rustProcessorUrl);

        // get the wasm
        const module: ArrayBuffer = await wasmModulePromise;

        // construct the processor
        const worklet = new AudioWorkletNode(audioContext, "RustProcessor", {
            processorOptions: { module },
        });

        // connect to output!
        worklet.connect(audioContext.destination);
    }
</script>

<svelte:window on:click={start} />
<h1>Click to start playback</h1>
