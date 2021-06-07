<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import Counter from '$lib/components/Counter.svelte';
  import SvelteWelcomePNG from '$assets/images/svelte-welcome.png';
  import SvelteWelcomeWEBP from '$assets/images/svelte-welcome.webp';
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="my-10 flex flex-col items-center justify-center flex-1">
  <h1 class="mb-4 w-full text-center text-3xl lg:text-4xl font-semibold">
    <span class="relative block w-full h-0 pb-[calc(100%*495/2048)]">
      <picture>
        <source srcset="{SvelteWelcomeWEBP}" type="image/webp" />
        <img
          class="absolute w-full h-full top-0 block"
          src="{SvelteWelcomePNG}"
          alt="Welcome"
        />
      </picture>
    </span>
    to your new
    <br class="lg:hidden" />
    SvelteKit app
  </h1>

  <h2 class="text-base">
    Try editing
    <strong>src/routes/index.svelte</strong>
  </h2>

  <div class="flex flex-col items-center">
    <Counter />
  </div>
</section>
