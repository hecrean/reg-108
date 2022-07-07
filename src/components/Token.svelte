<script lang="ts">
	import type { Color } from '$utils/color';
	interface $$Props {
		tag: string;
		bgColor: Color;
		avatarUrl: string | undefined;
	}
	export let tag: string;
	export let bgColor: string;
	export let avatarUrl: string | undefined;
</script>

<p class="token" style="--bg-color: {bgColor}">
	{#if avatarUrl}
		<span>
			<img src={avatarUrl} />
		</span>
	{/if}
	<span>{tag}</span>

	<button
		><svg viewBox="0 0 50 50" fill="none"
			><line
				x1="34.0919"
				y1="16.7071"
				x2="15.7071"
				y2="35.0919"
				stroke="currentColor"
				stroke-width="2"
			/><line
				x1="34.092"
				y1="35.0919"
				x2="15.7072"
				y2="16.7071"
				stroke="currentColor"
				stroke-width="2"
			/></svg
		></button
	>
</p>

<style lang="scss">
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

	.token {
		display: inline-flex;
		overflow: hidden;
		margin-left: 0.25rem;
		align-items: center;
		border-radius: 9999px;
		@include background(var(--bg-color));
		color: white;

		img {
			max-width: 1.75rem;
			width: 100%;
			border-radius: 50%;
			&:hover {
				-webkit-filter: drop-shadow(5px 5px 5px #222);
				filter: drop-shadow(5px 5px 5px #222);
			}

			object-fit: cover;
			aspect-ratio: 1;
		}

		span {
			display: inline-block;
			padding-top: 0.25rem;
			padding-bottom: 0.25rem;
			padding-left: 0.75rem;
			text-transform: capitalize;
		}
		button {
			border: none;
			padding: 0.125rem;
			transition-property: background-color, border-color, color, fill, stroke;
			transition-duration: 200ms;
			width: 2rem;
			height: 2rem;
			cursor: pointer;
			margin: 0;
			color: inherit;
			background-color: inherit;

			&:hover {
				color: rgba(0, 0, 0, 0.05);
			}
		}
	}
</style>
