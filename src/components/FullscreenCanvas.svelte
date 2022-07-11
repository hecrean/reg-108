<script lang="ts">
	import { DisplacementMap } from '$data/displacement-maps';

	import type { AnnotatedImage, CaseStudy, StageADT, ViewADT } from '$data/state';
	// import { three, type ThreeApi } from '$lib/three/three-api.store';
	import { three, type ThreeApi } from '$lib/three/three-api';

	import { Direction, drag, pointerPosition, wheel } from '$utils/gesture';
	import { resizeObserver } from '$utils/resize-observer';
	import { onMount } from 'svelte';
import { noop } from 'svelte/internal';

	// const coords = spring({ x: 0, y: 0 }, {
	// 	stiffness: 0.2,
	// 	damping: 0.4
	// });

	/**
	 * props
	 */
	export let stage: StageADT;
	export let view: ViewADT;
	export let caseStudy: CaseStudy;

	/** fullscreen canvas*/
	let canvasProxyEl: HTMLDivElement;
	let cssEl: HTMLDivElement;
	let canvasEl: HTMLCanvasElement;
	let threeApi: ThreeApi;

	// api should be reanitialised when the els are bound to the dom;

	onMount(() => {
		//canvas observables
		const api = three(canvasProxyEl, canvasEl, cssEl);
		console.log('cssEl', cssEl)

		threeApi = api;

		const ro$ = resizeObserver(canvasProxyEl);
		const pointerPosition$ = pointerPosition(canvasEl);
		const drag$ = drag(canvasEl, {
			direction: Direction.All,
			pointers: 1,
			threshold: { distancePointerMoved: { min: -Infinity, max: Infinity } }
		});
		const wheel$ = wheel(canvasEl);

		//subscriptions
		const resizeSub = ro$.subscribe(({ width, height }) => {});

		const pointerPositionSub = pointerPosition$.subscribe(() => {});

		const dragSub = drag$.subscribe(({ value: { dNormalisedDeviceCoords } }) =>
			api.pan(api.state(), -dNormalisedDeviceCoords.dx, -dNormalisedDeviceCoords.dy)
		);
		const wheelSub = wheel$.subscribe(({ event }) => {
			api.dolly(api.state(), 0.02 * event.deltaY);
		});

		// const unsubscribeThreeApi = api.subscribe(() => {});

		//animation loop
		const loop = () => {
			api.render(api.state());
			requestAnimationFrame(loop);
		};
		const frameId = requestAnimationFrame(loop);

		//cleanup
		return () => {
			resizeSub.unsubscribe();
			pointerPositionSub.unsubscribe();
			dragSub.unsubscribe();
			wheelSub.unsubscribe();
			cancelAnimationFrame(frameId);
			// onDestroy(unsubscribeThreeApi);
		};
	});


	$: currImage = caseStudy['stages'][stage]['views'][view][0];

	$: if (threeApi) {
		stage; view; //additional dependencies
		threeApi.changeHotspots(threeApi.state(), currImage.hotspots)
	}

	$: if (threeApi
	) {
		(async() => {

			await threeApi.changePlaneTexture(
					threeApi.state(),
					currImage.url,
					currImage.url,
					DisplacementMap.COSMOLOGICAL,
					currImage.aspect_ratio,
					[],
					[]
			);

			threeApi.fitPlaneToViewport(threeApi.state());

		})()
	}



</script>

<div class:canvas-proxy={true} data-fullscreen={false} bind:this={canvasProxyEl}>
	<canvas bind:this={canvasEl} class:webgl-canvas={true} />
	<div bind:this={cssEl} class:css-canvas={true} />
	<div class:canvas-overlay={true}><slot name="canvas-overlay" /></div>
</div>

<style lang="scss">
	@mixin covering() {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.canvas-proxy {
		z-index: 0;
		position: relative;
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		background-color: transparent;
		overflow: hidden;
		overscroll-behavior: none;
		user-select: none;

		&[data-fullscreen='true'] {
			z-index: 100;
			position: absolute;
			@include covering();
			overscroll-behavior: none;
			user-select: none;
			overflow: hidden;
			transition: width 1s ease-in-out;
			transition: height 1s ease-in-out;
		}
	}
	.canvas-overlay {
		z-index: 3;
		position: absolute;
		@include covering();
		background-color: transparent;
		pointer-events: none;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
			background-color: grey;
		}
		to {
			opacity: 1;
			background-color: black;
		}
	}

	.webgl-canvas {
		position: absolute;
		@include covering();
		height: 100%;
		width: 100%;
		box-sizing: border-box;
		touch-action: none;
		animation: fade-in 1s ease 0.3s forwards;
		transition: all 0.3s;
		overscroll-behavior: none;

		cursor: grab;
		&:active {
			cursor: grabbing;
		}
	}

	.css-canvas {
		position: absolute;
		@include covering();
		height: 100%;
		width: 100%;
		z-index: 3;
		pointer-events: none;
	}
</style>
