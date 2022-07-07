<script lang="ts">
	export let open = false;
</script>

<aside class:open>
	<nav>
		<slot />
	</nav>
</aside>

<style>
	aside {
		right: -100%;
		transition: right 0.3s ease-in-out;
		position: absolute;
		background-color: #e5e7eb;
		width: 100%;
		height: 100%;
		max-height: 100vh;
		overflow-y: scroll;
		border-right-width: 2px;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		z-index: 5;
	}

	.open {
		right: 0;
	}
</style>
