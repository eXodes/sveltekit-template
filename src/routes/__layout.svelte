<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';
</script>

<Header />

<main class="w-full">
  <slot />
</main>

<Footer />

<style>
</style>
