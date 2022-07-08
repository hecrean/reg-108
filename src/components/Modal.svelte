<script lang="ts">
	import { fade } from 'svelte/transition';
	type $$Props = { open: boolean };
	export let open: boolean;
</script>

{#if open}
	<dialog class="modal" transition:fade on:introstart on:outroend>
		<div class={'overlay'} on:click={() => (open = !open)} />
		<div class={'panel'}>
			<slot />
		</div>
	</dialog>
{/if}

<style lang="scss">
	.modal {
		pointer-events: all;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 100;

		display: grid;
		place-items: center;

		.overlay {
			position: absolute;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
		}

		.panel {
			aspect-ratio: 16 / 9;
			box-sizing: content-box;
			position: absolute;
			background: white;
			padding: 2rem;
			margin: 2rem;
			border-radius: 1rem;
			max-height: 75vh;
		}
	}
</style>
