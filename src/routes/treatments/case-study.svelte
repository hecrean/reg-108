<script lang="ts">
	import FullscreenCanvas from '$components/FullscreenCanvas.svelte';
	import IconButton from '$components/IconButton.svelte';

	import PatientInfo from '$components/PatientInfo.svelte';
	import Timeline from '$components/Timeline.svelte';
	import StageTimeline from '$components/StageTimeline.svelte';
	import { caseStudies, type StageADT, type ViewADT } from '$data/state';
	import CellularEyeIcon from '$icons/CellularEyeIcon.svelte';
	import FundusIcon from '$icons/FundusIcon.svelte';
	import OctIcon from '$icons/OctIcon.svelte';
	import OverlayLayout from '$layouts/OverlayLayout.svelte';
	import Splitscreen from '$layouts/Splitscreen.svelte';
	import type { SplitScreenState } from '$stores/splitscreen';

	$: caseStudy = caseStudies[0]!;

	let splitscreen: SplitScreenState = 'equal';
	let view: ViewADT = 'fa';
	let stage: StageADT = 'baseline';

	const views: Array<ViewADT> = ['fundus', 'oct', 'fa'];
</script>

<Splitscreen bind:splitscreen>
	<PatientInfo slot="left" {caseStudy} bind:splitscreen />
	<FullscreenCanvas slot="right" bind:view bind:stage {caseStudy}>
		<OverlayLayout slot="canvas-overlay">
			<!-- <Timeline
				slot="foreground-top"
				radius={0.5}
				timelineItems={[{ stage: 'baseline' }, { stage: 'week24' }, { stage: 'week52' }]}
				bind:stage
			/> -->
			<StageTimeline slot="foreground-top" bind:stage />
			<div class="view-btns-container" slot="foreground-bottom">
				{#each views as v}
					<button on:click={() => (view = v)}>
						<div class={'circle'} />
						<strong>{v}</strong>
					</button>
				{/each}
			</div>
		</OverlayLayout>
	</FullscreenCanvas>
</Splitscreen>

<style lang="scss">
	@use 'sass:math';
	@import '../../styles/color';

	@mixin background($bg) {
		background: $bg;
		&:hover {
			filter: brightness(85%);
			transition: all 0.3s ease;
		}
		&:active {
			filter: brightness(85%);
		}
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.hover-to-display {
		&:not(:hover) {
			opacity: 0.4;
		}
	}

	.video {
		width: 100%;
		object-fit: contain;
		border-radius: 0.5rem;
	}

	/* @mixin text-color($color) {
		color: $color;
		&:hover {
			color: lighten($color, 25%);
			transition: all 0.3s ease;
		}
		&:active {
			color: lighten($color, 50%);
		}
	} */
	.view-btns-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;

		&:not(:hover) {
			transition: all 0.2s;
			opacity: 0.2;
		}
	}

	@mixin circle($width, $color) {
		width: $width;
		height: $width;
		background: $color;
		-webkit-border-radius: math.div($width, 2);
		-moz-border-radius: math.div($width, 2);
		border-radius: math.div($width, 2);
	}

	.circle {
		@include circle(60px, hsl(213, 27%, 84%));
	}

	button {
		font-size: small;
		@include background(hsl(202, 100%, 21%));
		color: hsl(202, 28%, 77%);
		border: none;
		pointer-events: all;
		cursor: pointer;
		border-radius: 10px;
		padding: 8px;
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		margin: 0 5px;

		strong {
			padding: 2px;
		}
	}
</style>
