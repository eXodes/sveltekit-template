# SvelteKit + TailwindCSS + Typescript + Firebase

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte), [`tailwindcss`](https://tailwindcss.com) and [`typescript`](https://www.typescriptlang.org);

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Linting

The project comes with linters that can check your app code for errors. To check for errors, run:

```bash
# format your code with Prettier
npm run format

# check for javascript & code format errors
npm run lint

# run Svelte diagnostics
npm run check
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
# build SvelteKit for local preview
npm run build

# build SvelteKit for Firebase hosting
npm run build:firebase
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Deploying

Before deploying with Firebase, create `.firebaserc` set your default Firebase project.

```json5
{
  projects: {
    default: 'sveltekit',
  },
}
```

First go to the functions directory and run the following:

```bash
# install cloud function dependencies
npm install

# build cloud function to serve as SSR
npm run build

# deploy cloud function to firebase
firebase deploy
```
