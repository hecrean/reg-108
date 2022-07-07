// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';

import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	customElement: true,

	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$utils: 'src/utils',
			$data: 'src/data',
			$layouts: 'src/layouts',
			$icons: 'src/icons',
			$styles: 'src/styles',
			$stores: 'src/stores',
			$actions: 'src/actions'
		}
	}
};

export default config;
