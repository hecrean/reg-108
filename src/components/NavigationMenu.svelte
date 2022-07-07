<script lang="ts" context="module">
</script>

<script lang="ts">
	export let headings: Array<string>;

	let focusedHeadingIdx: number = 0;
</script>

<div class="container">
	<div class="heading-container">
		<div class="overflow-blur-effect" />
		<div class="headings">
			{#each headings as heading, i}
				<span
					class="heading"
					class:focused={focusedHeadingIdx === i}
					on:click={() => (focusedHeadingIdx = i)}>{heading}</span
				>
			{/each}
		</div>
	</div>
	<div class="content">
		{#if focusedHeadingIdx === 0}
			<slot name="slot-0" />
		{/if}
		{#if focusedHeadingIdx === 1}
			<slot name="slot-1" />
		{/if}
		{#if focusedHeadingIdx === 2}
			<slot name="slot-2" />
		{/if}
		{#if focusedHeadingIdx === 3}
			<slot name="slot-3" />
		{/if}
		{#if focusedHeadingIdx === 4}
			<slot name="slot-4" />
		{/if}
		{#if focusedHeadingIdx === 5}
			<slot name="slot-5" />
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../styles//color';
	@mixin text-color($bg) {
		color: $bg;
		&:hover {
			color: lighten($bg, 8%);
			transition: all 0.3s ease;
		}
		&:active {
			color: lighten($bg, 25%);
		}
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: $base-grey;
	}
	.heading-container {
		position: relative;
		border-bottom: 2px solid $grey-800;
	}
	.content {
		flex-grow: 1;
	}

	.overflow-blur-effect {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		background-color: #6b7280;
		width: 7rem;
		background: linear-gradient(to right, transparent 60%, $base-grey);
	}

	.headings {
		display: flex;
		overflow-x: auto;
		padding-top: 1rem;
		padding-bottom: 1rem;
		padding-left: 1rem;
		padding-right: 7rem;
		margin-left: 1.5rem;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.heading {
		display: inline-block;
		padding: 0.25rem 0.5em;
		white-space: pre;
		cursor: pointer;
		text-transform: capitalize;
		background-color: inherit;
		@include text-color(rgb(221, 213, 213));
	}

	.focused {
		color: white;
		font-weight: 600;
		transition: font-weight 0.3s ease;
	}
</style>
