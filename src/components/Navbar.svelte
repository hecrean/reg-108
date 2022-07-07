<script>
	import Hamburger from '$components/Hamburger.svelte';

	export let sidebar = false;
</script>

<header>
	<nav class="right-corner">
		<Hamburger bind:open={sidebar} />
	</nav>
</header>

<style lang="scss">
	header {
		position: sticky;
		top: 0;
		z-index: 20;
		height: 0rem;
	}

	.right-corner {
		position: absolute;
		top: 0;
		right: 0;
	}
</style>
