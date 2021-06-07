<script lang="ts">
  import { page } from '$app/stores';
  import logo from '$assets/images/svelte-logo.svg';
</script>

<header>
  <div class="corner">
    <a href="https://kit.svelte.dev">
      <img src="{logo}" alt="SvelteKit" />
    </a>
  </div>

  <nav>
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"></path>
    </svg>
    <ul>
      <li class:active="{$page.path === '/'}">
        <a sveltekit:prefetch href="/">Home</a>
      </li>
      <li class:active="{$page.path === '/about'}">
        <a sveltekit:prefetch href="/about">About</a>
      </li>
      <li class:active="{$page.path === '/todos'}">
        <a sveltekit:prefetch href="/todos">Todos</a>
      </li>
    </ul>
    <svg viewBox="0 0 2 3" aria-hidden="true">
      <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"></path>
    </svg>
  </nav>

  <div class="corner">
    <!-- TODO put something else here? github link? -->
  </div>
</header>

<style>
  header {
    @apply flex justify-between;
  }

  .corner {
    @apply w-12 h-12;
  }

  .corner a {
    @apply flex items-center justify-center w-full h-full;
  }

  .corner img {
    @apply w-8 h-8 object-contain;
  }

  nav {
    @apply flex justify-center;
  }

  svg {
    @apply w-8 h-full block fill-current text-white text-opacity-70;
  }

  ul {
    @apply relative p-0 m-0 h-12 flex justify-center items-center list-none bg-white bg-opacity-70 bg-contain space-x-4;
  }

  li {
    @apply relative h-full;
  }

  li.active::before {
    @apply w-full h-[6px] absolute inset-x-0 top-0 bg-accent;
    content: '';
  }

  nav a {
    @apply h-full flex items-center px-0 py-4 text-accent font-bold text-sm uppercase tracking-widest no-underline transition duration-200 ease-linear;
  }

  a:hover {
    @apply text-opacity-95;
  }
</style>
