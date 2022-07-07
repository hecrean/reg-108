<script lang="ts">
	import { type Dataset } from '$utils/chart';
	import { resizeObserver } from '$utils/resize-observer';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	// type BarChartData = Array<{ tag: string, y: number; yUnit: string; info?: string }>;

	export let title: string;
	export let subtitle: string;
	export let dataset: Dataset;

	interface $$Props {
		title: string;
		subtitle: string;
		dataset: Dataset;
	}

	let chartEl: HTMLDivElement;

	const numberBars = data.length;

	let chartWidth: number;
	let chartHeight: number;

	onMount(() => {
		const chartElResize$ = resizeObserver(chartEl);
		const subscription = chartElResize$.subscribe((rect: DOMRect) => {
			chartWidth = rect.width;
			chartHeight = rect.height;
		});

		return () => subscription.unsubscribe();
	});

	$: padding = { left: 0.1 * chartWidth, right: 0.1 * chartWidth, between: 0.05 * chartWidth };

	$: barWidth =
		(chartWidth - (padding.left + padding.right) - (numberBars - 1) * padding.between) / numberBars;

	const normalised = (data: Array<Row>): Array<Row> => {
		const ys = data.map((n) => n.y);
		const max = Math.max(...ys);
		return data.map((n) => ({ ...n, y: n.y / max }));
	};

	$: normalisedData = normalised(data);
</script>

<figure>
	<div class="heading">
		<h3 class="text-xl color-white">{title}</h3>
		<p class="text-sm color-white">{subtitle}</p>
	</div>
	<div class="chart" bind:this={chartEl} in:scale out:fade>
		<svg viewBox="0 0 {chartWidth + 30} {chartHeight + 10}">
			{#if numberBars > 0}
				{#each normalisedData as { y, yUnit, tag }, i}
					<g>
						<rect
							x={padding.left + i * (barWidth + padding.between)}
							y={(1 - y) * chartHeight}
							width={barWidth}
							height={y * chartHeight}
							stroke="none"
							fill="#7DFFE0"
						/>
						<text
							x={padding.left + (0.5 + i) * barWidth + i * padding.between}
							y={(1 - 0.5 * y) * chartHeight}
							fill="#000"
							text-anchor="middle"
							style="font-size: 12px">{`${Math.round(y * 10) / 10} ${yUnit}`}</text
						>
						<text
							x={padding.left + (0.5 + i) * barWidth + i * padding.between}
							y={chartHeight + 10}
							fill="#000"
							text-anchor="middle"
						>
							{tag}
							<!-- <tspan textLength={barWidth * 0.6}>{tag}</tspan> -->
						</text>
					</g>
					<line
						x1="0"
						y1={chartHeight}
						x2={chartWidth}
						y2={chartHeight}
						stroke="#fff"
						stroke-width="0.3"
					/>
				{/each}
			{:else}
				<rect x="0" y="0" width={chartWidth} height={chartHeight * 0.6} fill="rgba(0,0,0,0.08)" />
				<text
					x={chartWidth / 2}
					y={chartHeight / 2}
					fill="#fff"
					text-anchor="middle"
					style="font-size: 12px;"
				>
					No data available
				</text>
			{/if}
		</svg>
	</div>
	<figcaption>
		<slot name="caption" />
	</figcaption>
</figure>

<style lang="scss">
	@import '../styles/color';
	@mixin hover-svg($bg) {
		background: $bg;
		&:hover {
			fill: darken($bg, 8%);
			transition: all 0.3s ease;
		}
		&:active {
			fill: darken($bg, 25%);
		}
	}

	figure {
		background-color: inherit;
		width: 100%;
		display: block;
		margin: 0;
	}
	figcaption {
		padding-top: 0.25rem;
	}

	.chart {
		position: relative;
		width: 100%;
	}

	svg {
		width: 100%;
		height: 100%;

		rect {
			@include hover-svg($teal);
		}
		text {
			pointer-events: none;
			font-size: medium;
			font-size: 8px;
			fill: white;
			text-anchor: middle;
		}
		tspan {
			font: bold 8px sans-serif;
			fill: red;
		}
	}
	.tooltip {
		position: absolute;
		bottom: -45px;
	}

	.heading {
		padding-top: 0.25rem;
	}

	.color-white {
		color: #ffffff;
	}

	.text-xl {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	.text-sm {
		font-size: 0.875rem;
		line-height: 1.25rem;
	}
</style>
