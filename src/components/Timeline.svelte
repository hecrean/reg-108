<script lang="ts" context="module">
	import type { StageADT } from '$data/state';

	type TimelineItem = {
		stage: StageADT;
	};
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';

	type $$Props = {
		timelineItems: Array<TimelineItem>;
		radius: number;
		stage: StageADT;
	};
	export let timelineItems: Array<TimelineItem>;
	export let radius: number;
	export let stage: StageADT;

	$: timelineLength = timelineItems.length;
	$: diameter = 2 * radius;
	$: lineWidth = radius * 0.2;

	const SPACE_BETWEEN_CIRCLES = 2;

	let timelineWidth: number;
	let timelineHeight: number;

	let visible = true;
</script>

{#if visible}
	<div bind:clientWidth={timelineWidth} bind:clientHeight={timelineHeight} class="relative">
		<svg
			width={`${timelineWidth}px`}
			height={`${timelineHeight}px`}
			viewBox="0 0 {timelineLength * diameter +
				(timelineLength - 1) * SPACE_BETWEEN_CIRCLES} {diameter}"
		>
			<defs>
				<filter id="id-of-your-filter">
					<feColorMatrix
						color-interpolation-filters="sRGB"
						type="matrix"
						values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0 "
					/>
				</filter>
			</defs>
			{#each timelineItems as item, i}
				<g out:fade={{ duration: 200 }} opacity="0.8">
					<circle
						class:circle={true}
						cx={radius + i * (diameter + SPACE_BETWEEN_CIRCLES)}
						cy={radius}
						r={radius}
						on:click={() => (stage = item.stage)}
					/>
					<line
						x1={diameter + i * (diameter + SPACE_BETWEEN_CIRCLES)}
						y1={radius}
						x2={diameter + i * diameter + (i + 1) * SPACE_BETWEEN_CIRCLES}
						y2={radius}
						stroke-width={lineWidth}
					/>
				</g>
			{/each}
		</svg>
	</div>
{/if}

<style lang="scss">
	@import '../styles/color';

	.relative {
		position: relative;
		height: 100%;
		width: 100%;
		max-width: 200px;
		max-height: 200px;

		&:not(:hover) {
			opacity: 0.4;
		}
	}

	svg {
		display: block;
	}

	circle {
		pointer-events: all;
		fill: $teal;
	}
	line {
		stroke: $teal;
	}

	text {
		font-size: 24px;
		fill: white;
		text-anchor: middle;
		dominant-baseline: middle;
	}

	.circle {
		&:hover {
			filter: invert(0.5) sepia(1) hue-rotate(200deg) saturate(4) brightness(1);
			/* filter: url('#id-of-your-filter'); */
		}
	}
</style>
