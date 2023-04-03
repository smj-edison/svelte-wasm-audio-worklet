<script lang="ts">
  import sinProcessorUrl from "$lib/audio-processor.ts?url";
  import { onMount } from "svelte";
  console.log(sinProcessorUrl);

  async function start() {
    const audioContext = new AudioContext();

    await audioContext.resume();
    await audioContext.audioWorklet.addModule(sinProcessorUrl);

    const worklet = new AudioWorkletNode(audioContext, "sin-processor");
    console.log(worklet);

    worklet.connect(audioContext.destination);
  }
</script>

<svelte:window on:click={start} />
<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
