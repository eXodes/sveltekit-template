<script context="module" lang="ts">
  import { enhance } from '$lib/form';
  import type { Load } from '@sveltejs/kit';

  // see https://kit.svelte.dev/docs#loading
  export const load: Load = async ({ fetch }) => {
    const res = await fetch('/todos.json');

    if (res.ok) {
      const todos = await res.json();

      return {
        props: { todos },
      };
    }

    const { message } = await res.json();

    return {
      error: new Error(message),
    };
  };
</script>

<script lang="ts">
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';

  type Todo = {
    uid: string;
    created_at: Date;
    text: string;
    done: boolean;
  };

  export let todos: Todo[];

  async function patch(res: Response) {
    const todo = await res.json();

    todos = todos.map((t) => {
      if (t.uid === todo.uid) return todo;
      return t;
    });
  }
</script>

<svelte:head>
  <title>Todos</title>
</svelte:head>

<div class="mx-auto p-4 lg:p-10 w-full max-w-5xl">
  <h1 class="mb-4 text-4xl font-extrabold text-center">Todos</h1>

  <form
    class="new"
    action="/todos.json"
    method="post"
    use:enhance="{{
      result: async (res, form) => {
        const created = await res.json();
        todos = [...todos, created];

        form.reset();
      },
    }}"
  >
    <input
      name="text"
      aria-label="Add todo"
      placeholder="+ tap to add a todo"
    />
  </form>

  {#each todos as todo (todo.uid)}
    <div
      class="todo"
      class:done="{todo.done}"
      transition:scale|local="{{ start: 0.7 }}"
      animate:flip="{{ duration: 200 }}"
    >
      <form
        class="update"
        action="/todos/{todo.uid}.json?_method=patch"
        method="post"
        use:enhance="{{
          pending: (data) => {
            todo.done = !!data.get('done');
          },
          result: patch,
        }}"
      >
        <input type="hidden" name="done" value="{todo.done ? '' : 'true'}" />
        <button
          class="toggle"
          aria-label="Mark todo as {todo.done ? 'not done' : 'done'}"></button>
      </form>

      <form
        class="text"
        action="/todos/{todo.uid}.json?_method=patch"
        method="post"
        use:enhance="{{
          result: patch,
        }}"
      >
        <input
          aria-label="Edit todo"
          type="text"
          name="text"
          value="{todo.text}"
        />
        <button class="save" aria-label="Save todo"></button>
      </form>

      <form
        class="remove"
        action="/todos/{todo.uid}.json?_method=delete"
        method="post"
        use:enhance="{{
          result: () => {
            todos = todos.filter((t) => t.uid !== todo.uid);
          },
        }}"
      >
        <button class="delete" aria-label="Delete todo"></button>
      </form>
    </div>
  {/each}
</div>

<style>
  .new {
    @apply m-0 mb-2;
  }

  input {
    @apply border-none;
  }

  input:focus-visible {
    @apply outline-none ring-4 ring-accent ring-opacity-30;
  }

  .new input {
    @apply w-full text-xl px-4 py-2 bg-white bg-opacity-50 text-center rounded;
  }

  .todo {
    @apply grid grid-flow-col grid-cols-6 gap-2 items-center m-0 mb-2 py-2 bg-white rounded transition-transform duration-200 shadow-lg;
  }

  .done {
    @apply transform-none opacity-40;
  }

  form.update {
    @apply col-span-1 flex items-center justify-center;
  }

  form.text {
    @apply relative col-span-4 flex items-center flex-grow flex-1;
  }

  form.remove {
    @apply my-auto col-span-1 flex items-center justify-center;
  }

  .todo input {
    @apply pl-3 py-2 pr-10 flex-1 rounded;
  }

  .todo button {
    @apply w-8 h-8 border-none bg-transparent bg-center bg-no-repeat;
  }

  button.toggle {
    @apply border border-solid border-black border-opacity-20 rounded-full bg-auto outline-none;
  }

  .done .toggle {
    background-image: url("data:image/svg+xml,%3Csvg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 1.5L7.4375 14.5L1.5 8.5909' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  }

  .delete {
    @apply opacity-20;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.5 5V22H19.5V5H4.5Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M10 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M14 10V16.5' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5H22' stroke='%23676778' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M8 5L9.6445 2H14.3885L16 5H8Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }

  .delete:hover,
  .delete:focus {
    @apply transition-opacity duration-200 opacity-100;
  }

  .save {
    @apply absolute right-2 opacity-0;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.5 2H3.5C2.67158 2 2 2.67157 2 3.5V20.5C2 21.3284 2.67158 22 3.5 22H20.5C21.3284 22 22 21.3284 22 20.5V3.5C22 2.67157 21.3284 2 20.5 2Z' fill='%23676778' stroke='%23676778' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M17 2V11H7.5V2H17Z' fill='white' stroke='white' stroke-width='1.5' stroke-linejoin='round'/%3E%3Cpath d='M13.5 5.5V7.5' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3Cpath d='M5.99844 2H18.4992' stroke='%23676778' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E%0A");
  }

  .todo input:focus + .save,
  .save:focus {
    @apply transition-opacity duration-200 opacity-100;
  }
</style>
