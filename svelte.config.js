import preprocess from 'svelte-preprocess';
import path from 'path';

const production = process.env.NODE_ENV === 'production';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    sourceMap: !production,
    defaults: {
      style: 'postcss',
    },
  }),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $assets: path.resolve('./src/assets'),
        },
      },
    },
  },
};

export default config;
