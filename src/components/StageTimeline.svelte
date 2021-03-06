<script lang="ts" context="module">
	import type { StageADT } from '$data/state';
</script>

<!-- https://svelte.dev/repl/5fc4b5dd5dec49d2be3fa160693372ce?version=3.31.0 -->

<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	type $$Props = {
		stage: StageADT;
	};
	export let stage: StageADT;
</script>

<div class={'container'}>
	<div class={'timeline'}>
		<div
			class:start={stage === 'baseline'}
			class:middle={stage === 'week24'}
			class:end={stage === 'week52'}
			data-stage={stage}
		>
			<div class={'dot'} data-moveable in:fade />
		</div>

		<hr class={'hr'} />

		<div class={'start'}>
			<button class={'dot'} on:click={() => (stage = 'baseline')} />
		</div>
		<div class={'middle'}>
			<button class={'dot'} on:click={() => (stage = 'week24')} />
		</div>
		<div class={'end'}>
			<button class={'dot'} on:click={() => (stage = 'week52')} />
		</div>
	</div>
	<div class={'timeline'}>
		<div class={'start'}>
			<button class={'button'} on:click={() => (stage = 'baseline')}>
				<span>Baseline</span>
			</button>
		</div>
		<div class={'middle'}>
			<button class={'button'} on:click={() => (stage = 'week24')}> <span>24 Weeks</span> </button>
		</div>
		<div class={'end'}>
			<button class={'button'} on:click={() => (stage = 'week52')}> <span>52 Weeks</span> </button>
		</div>
	</div>
</div>

<style lang="scss">
	$white: white;
	$light-blue: hsl(202, 100%, 21%);
	$light-blue-accent: hsl(215, 20%, 65%);
	$timeline-height: 2rem;
	$timeline-pipe-height: 2px;

	.container {
		pointer-events: all;

		font-size: small;
		font-weight: bold;
		text-transform: uppercase;
		margin: 1rem;
		padding: 1rem;
		background-color: rgba($white, 0.4);
		border-radius: 10px;
		display: flex;
		flex-direction: column;

		&:not(:hover) {
			transition: all 0.2s;
			opacity: 0.2;
		}
	}

	.button {
		padding: 0rem 8px;
		width: 100%;
		height: 100%;
		color: $light-blue;
		background-color: transparent;
		border: none;
		cursor: pointer;
		&:hover {
			color: $light-blue-accent;
		}
	}

	.timeline {
		background-color: transparent;
		width: 100%;
		height: $timeline-height;
		display: grid;
		grid-auto-columns: 1fr;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-template-areas: 'start middle end';
		cursor: pointer;
		justify-content: center;
	}

	.hr {
		background-color: $light-blue-accent;
		color: hsl(214, 32%, 91%);
		grid-column: 1/-1;
		margin: 0;
		padding: 0;
		margin-top: calc(-0.5 * $timeline-height - $timeline-pipe-height);
		justify-items: center;
		align-items: center;
		width: 99%;
		height: 3px;
	}

	@mixin dot() {
		height: $timeline-height;
		width: $timeline-height;
		background-color: $light-blue-accent;
		border-radius: 40px;
		border: none;
		cursor: pointer;

		&:hover {
			background-color: $light-blue;
		}

		&[data-moveable] {
			background-color: $light-blue;
			z-index: 20;
		}
	}

	.dot {
		@include dot();
	}

	.start {
		grid-area: start;
		display: grid;
		width: 100%;
		height: 100%;
		justify-items: center;
		align-items: center;
	}

	.middle {
		grid-area: middle;
		display: grid;
		width: 100%;
		height: 100%;
		justify-items: center;
		align-items: center;
	}
	.end {
		grid-area: end;
		display: grid;
		width: 100%;
		height: 100%;
		justify-items: center;
		align-items: center;
	}
</style>
