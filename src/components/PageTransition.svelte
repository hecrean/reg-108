<script lang="ts">
	import { fade } from 'svelte/transition';
	export let pathname: string = '';
</script>

{#key pathname}
	<div class="wrapper" in:fade={{ duration: 800, delay: 300 }} out:fade>
		<slot />
	</div>
{/key}

<style lang="scss">
	.wrapper {
		margin: 0;
		padding: 0;
		min-width: 100vw;
		min-height: 100vh;
		height: 100vh;
	}
</style>
