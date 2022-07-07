<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ url: { pathname } }) => ({
		props: { pathname }
	});
</script>

<script lang="ts">
	import PageTransition from '$components/PageTransition.svelte';
	export let pathname: string;
</script>

<PageTransition {pathname}>
	<slot />
</PageTransition>

<style lang="scss" global>
	@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

	//  Resets :
	//  -----------------------------
	//
	//  Table of Contents:
	//
	//   1. Global
	//   2. Html / Body
	//   3. Root
	//   4. Next
	//   5. Media : img / picture / video / canvas / svg
	//   6. Forms
	//   7. Headers / Paragraph
	//   8. List
	//   9. Links
	//   10. Input
	//
	//  -----------------------------

	// 1. Global
	// --

	*,
	*::before,
	*::after {
		/*Use a more-intuitive box-sizing model.*/
		box-sizing: border-box;
	}

	* {
		/*Remove default margin*/
		margin: 0;
		// /*Remove default padding*/
		// padding: 0;
		border: 0;
		vertical-align: baseline;
	}

	//for debugging purposes;
	// :global(.undefined) {
	//   outline: 5px solid rgb(255, 1, 1);
	// }

	// 2. Html / Body
	// --

	html,
	body {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue,
			Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol,
			Noto Color Emoji;
		/*Allow percentage-based heights in the application*/
		height: 100%;
		width: 100%;
		margin: 0;
		padding: 0;
		// overscroll-behavior: none;
		touch-action: none;
	}

	body {
		line-height: 1.4;
		letter-spacing: 0;
		background-color: #fff;
		color: #191927;
		font-size: 1em;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-weight: normal;
		word-wrap: break-word;
		overflow-x: hidden;
	}

	#element::-webkit-scrollbar {
		display: none;
	}

	body {
		/* Add accessible line-height*/
		line-height: 1.5;
		/*Improve text rendering*/
		-webkit-font-smoothing: antialiased;
	}

	// 3. Root
	// --

	#root {
		//Create a root stacking context
		isolation: isolate;
		height: 100%;
	}

	// 5. Media : img / picture / video / canvas / svg
	// --

	/*
  Improve media defaults
  */
	img,
	picture,
	video,
	canvas,
	svg {
		display: block;
		max-width: 100%;
	}

	// 6. Forms
	// --

	/*
  Remove built-in form typography styles
  */
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	// 7. Headers / Paragraph
	/*
  Avoid text overflows
  */
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		overflow-wrap: break-word;
	}

	// 8. List
	// --

	ul[class],
	ol[class] {
		padding: 0;
		list-style: none;
	}

	// 9. Links
	// --

	/* A elements that don't have a class get default styles */
	a:not([class]) {
		text-decoration-skip-ink: auto;
	}

	// 10. Inputs
	// --

	/* Inherit fonts for inputs and buttons */
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	input {
		appearance: none;
		border-width: 0;
		box-sizing: border-box;
		font-family: inherit;
		margin: 0;
		outline: none;
		padding: 0;
		width: 100%;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		&::before {
			box-sizing: border-box;
		}
		&::after {
			box-sizing: border-box;
		}
	}

	button {
		align-items: center;
		appearance: none;
		box-sizing: border-box;
		display: inline-flex;
		flex-shrink: 0;
		justify-content: center;
		line-height: 1;
		margin: 0;
		outline: none;
		padding: 0;
		text-decoration: none;
		user-select: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		::before {
			box-sizing: border-box;
		}
		::after {
			box-sizing: border-box;
		}
	}

	/* Natural flow and rhythm in articles by default */
	// article > * + * {
	//   margin-top: 1.5em;
	// }

	$header-height: 60px;
	$footer-height: 60px;

	$white: hsl(210, 40%, 96%);

	// primary colors
	$eylea-blue: rgb(0, 68, 107);
	$eylea-yellow: rgb(255, 209, 0);

	//secondary colors
	$light-blue: rgba(173, 223, 237, 0.4);
	$light-blue-accent: rgb(173, 223, 237);
	$deep-blue: rgb(0, 43, 84);

	$teal: rgb(96, 205, 203);
	$teal-accent-1: rgba(96, 205, 203, 0.35);
	$teal-accent-2: rgba(96, 205, 203, 0.7);
	$dark-teal: rgb(44, 145, 153);

	$light-grey: rgb(227, 228, 229);
	$grey-800: rgb(136, 138, 140);

	$violet: rgb(147, 167, 203);
</style>
