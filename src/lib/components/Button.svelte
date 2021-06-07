<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let className: string;
  export let appearance: string;
  export let label: string;
  export { className as class };

  const appearanceClass = () => {
    switch (appearance) {
      case 'primary':
        return 'bg-accent hover:bg-bg-opacity-90 focus:ring-accent text-white';
      default:
        return 'bg-primary hover:bg-opacity-90 focus:ring-primary';
    }
  };
</script>

<button
  type="button"
  class="px-4 py-2 rounded-md shadow-sm text-sm font-medium tracking-wider focus:outline-none focus:ring-4 focus:ring-opacity-30 {className} {appearanceClass()}"
  on:click="{() => dispatch('click')}"
>
  <slot>
    {label}
  </slot>
</button>
