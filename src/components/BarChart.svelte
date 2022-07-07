<script lang="ts">
	import { largest, type Dataset, type NoData } from '$utils/chart';
	import { resizeObserver } from '$utils/resize-observer';
	import { scaleLinear } from 'd3-scale';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import Hoverable from './Hoverable.svelte';

	type $$Props = {
		dataset: Dataset;
	};
	export let dataset: Dataset;

	let chartEl: HTMLDivElement;
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

	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	$: xs = dataset.points.map((p) => p.x);
	$: ys = dataset.points.map((p) => p.y);

	$: xScale = scaleLinear()
		.domain([0, xs.length])
		.range([padding.left, chartWidth - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, largest(ys)])
		.range([chartHeight - padding.bottom, padding.top]);

	$: innerWidth = chartWidth - (padding.left + padding.right);

	$: barWidth = innerWidth / xs.length;
</script>

<Hoverable let:hovering>
	<figure>
		<div class="chart" bind:this={chartEl} in:scale>
			<svg
				viewBox="0 0 {chartWidth + padding.left + padding.right} {chartHeight +
					padding.top +
					padding.bottom}"
			>
				{#if dataset.points.length > 0}
					<!-- y axis -->
					{#if hovering}
						<g class="axis y-axis">
							{#each ys as y}
								<g class="tick tick-{y}" transform="translate(0, {yScale(y)})">
									<line x2="100%" />
									<text y="-4">{y} </text>
								</g>
							{/each}
						</g>
					{/if}

					<!-- x axis -->
					<g class="axis x-axis">
						{#each xs as x, i}
							<g class="tick" transform="translate({xScale(i)},{chartHeight})">
								<text x={barWidth / 2} y="-4">{x}</text>
							</g>
						{/each}
						<line
							x1="0"
							y1={chartHeight - padding.bottom}
							x2={chartWidth}
							y2={chartHeight - padding.bottom}
							stroke="#fff"
							stroke-width="0.3"
						/>
						<text x={chartWidth / 2} y={chartHeight + padding.top}
							>{`${dataset.variableNames.x} `} {`(${dataset.units.x})`}</text
						>
					</g>

					<g class="bars">
						{#each dataset.points as { x, y }, i}
							<rect
								style:--bar-bg-color={dataset.meta.color}
								x={xScale(i) + 2}
								y={yScale(y)}
								width={barWidth - 4}
								height={yScale(0) - yScale(y)}
							/>

							<g
								transform="translate({xScale(i) + barWidth / 2}, {yScale(y) +
									0.5 * (yScale(0) - yScale(y))})"
							>
								<text fill="#000" text-anchor="middle"
									>{`${Math.round(y * 10) / 10} ${dataset.units.y}`}</text
								>
							</g>
						{/each}
					</g>
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
</Hoverable>

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
	$font-family_1: Helvetica, Arial;

	figure {
		background-color: inherit;
		width: 100%;
		display: block;
		margin: 0;
	}
	figcaption {
		padding-top: 0.25rem;
	}

	h2 {
		text-align: center;
	}

	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}
	svg {
		position: relative;
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
	.tick {
		font-family: $font-family_1;
		font-size: 0.725em;
		font-weight: 200;
		line {
			stroke: #e2e2e2;
			stroke-dasharray: 2;
		}
		text {
			fill: #ccc;
			text-anchor: start;
		}
	}
	.tick.tick-0 {
		line {
			stroke-dasharray: 0;
		}
	}
	.x-axis {
		.tick {
			text {
				text-anchor: middle;
			}
		}
	}
	.bars {
		rect {
			fill: var(--bar-bg-color);
			stroke: none;
			opacity: 0.65;
		}
	}
</style>
