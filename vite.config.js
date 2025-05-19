import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined,
	test: {
		include: ['src/**/*.{test,spec}.{js,ts,svelte}'],
		environment: 'jsdom',
		globals: true
	}
});
