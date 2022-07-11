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

	//import components:
	@import '../lib/three/components/three-html/label-button.scss';

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

		cursor: url("data:image/svg+xml,%3Csvg width='17px' height='17px' viewBox='0 0 17 17' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%0A%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group-15' transform='translate(1.000000, 1.000000)'%3E%3Ccircle id='Oval-Copy-2' fill-opacity='0.1' fill='%2317181A' cx='7.5' cy='7.5' r='7.5' /%3E%3Ccircle id='Oval' stroke='%23FFFFFF' stroke-width='2' cx='7.5' cy='7.5' r='7.5' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A")
				8.5 8.5,
			pointer;

		cursor: url("data:image/svg+xml,%3Csvg width='22px' height='22px' viewBox='0 0 22 22' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group-16' transform='translate(1.000000, 1.000000)'%3E%3Ccircle id='Oval-Copy-6' fill-opacity='0.1' fill='%2317181A' cx='10' cy='10' r='10'%3E%3C/circle%3E%3Ccircle id='Oval-Copy-4' stroke='%23FFFFFF' stroke-width='2' cx='10' cy='10' r='10'%3E%3C/circle%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
				11 11,
			grab;

		cursor: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%0A%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group-14' transform='translate(1.000000, 1.000000)'%3E%3Ccircle id='Oval-Copy-2' fill-opacity='0.1' fill='%2317181A' cx='15' cy='15' r='15' /%3E%3Cg id='Group-Copy-4' stroke='%23FFFFFF' stroke-width='2'%3E%3Crect id='Rectangle-Copy-4' fill-opacity='0' fill='%23000000' x='0' y='0' width='30' height='30' rx='15' /%3E%3Cline x1='10' y1='15' x2='20' y2='15' id='Line-2-Copy' stroke-linecap='square' /%3E%3Cline x1='10' y1='15' x2='20' y2='15' id='Line-2-Copy-2' stroke-linecap='square' transform='translate(15.000000, 15.000000) rotate(90.000000) translate(-15.000000, -15.000000) ' /%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A")
			16 16 zoom-in;
		cursor: url("data:image/svg+xml,%3Csvg width='32px' height='32px' viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%0A%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Group-14' transform='translate(1.000000, 1.000000)'%3E%3Ccircle id='Oval-Copy-2' fill-opacity='0.1' fill='%2317181A' cx='15' cy='15' r='15' /%3E%3Cg id='Group-Copy-4' stroke='%23FFFFFF' stroke-width='2'%3E%3Crect id='Rectangle-Copy-4' fill-opacity='0' fill='%23000000' x='0' y='0' width='30' height='30' rx='15' /%3E%3Cline x1='10' y1='15' x2='20' y2='15' id='Line-2-Copy' stroke-linecap='square' /%3E%3Cline x1='10' y1='15' x2='20' y2='15' id='Line-2-Copy-2' stroke-linecap='square' transform='translate(15.000000, 15.000000) rotate(90.000000) translate(-15.000000, -15.000000) ' /%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A")
			16 16 zoom-out;
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
