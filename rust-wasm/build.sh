#!/bin/bash

OUT_DIR="../svelte-app/src/lib/wasm"

wasm-pack build --target web --out-dir "${OUT_DIR}" "$@"
patch "${OUT_DIR}/rust_wasm.js" rust_wasm.patch