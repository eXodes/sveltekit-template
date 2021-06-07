<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { spring } from 'svelte/motion';

  let count = 0;

  const displayed_count = spring();
  $: displayed_count.set(count);
  $: offset = modulo($displayed_count, 1);

  function modulo(n: number, m: number) {
    // handle negative numbers
    return ((n % m) + m) % m;
  }
</script>

<div class="counter">
  <button
    on:click="{() => (count -= 1)}"
    aria-label="Decrease the counter by one"
  >
    <svg aria-hidden="true" viewBox="0 0 1 1">
      <path d="M0,0.5 L1,0.5"></path>
    </svg>
  </button>

  <div class="counter-viewport">
    <div
      class="counter-digits"
      style="transform: translate(0, {100 * offset}%)"
    >
      <strong style="top: -100%" aria-hidden="true">
        {Math.floor($displayed_count + 1)}
      </strong>
      <strong>{Math.floor($displayed_count)}</strong>
    </div>
  </div>

  <button
    on:click="{() => (count += 1)}"
    aria-label="Increase the counter by one"
  >
    <svg aria-hidden="true" viewBox="0 0 1 1">
      <path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1"></path>
    </svg>
  </button>
</div>

<Button
  class="my-2"
  appearance="primary"
  label="Reset"
  on:click="{() => (count = 0)}"
/>

<style>
  .counter {
    @apply flex border-none border-t border-b border-white border-opacity-10 my-4 mx-0;
  }

  .counter button {
    @apply w-8 p-0 flex items-center justify-center bg-transparent text-text text-3xl rounded outline-none;
  }

  .counter button:hover {
    @apply bg-secondary;
  }

  .counter button:focus {
    @apply ring-4 ring-gray-200 ring-opacity-30;
  }

  svg {
    @apply w-[25%] h-[25%] stroke-current text-gray-500;
  }

  path {
    @apply stroke-2;
    vector-effect: non-scaling-stroke;
  }

  .counter-viewport {
    @apply w-[8rem] h-[4rem] overflow-hidden text-center relative;
  }

  .counter-viewport strong {
    @apply absolute block w-full h-full font-normal text-accent text-[4rem] flex items-center justify-center;
  }

  .counter-digits {
    @apply absolute w-full h-full;
  }
</style>
