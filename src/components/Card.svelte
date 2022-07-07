<script lang="ts">
	import FlexboxRows from '$components/flexbox-table/Rows.svelte';

	export let rows: Array<[heading: string, datum: string]>;
	export let avatarUrl: string;
	export let label: string;
</script>

<div class="stack">
	<div class="avatar-block">
		<div class="avatar-wrapper">
			<img class="avatar-img" src={avatarUrl} />
		</div>
	</div>
	<div class="label">{label}</div>
	<div class="content-block">
		<FlexboxRows {rows} />
	</div>
</div>

<style lang="scss">
	@use 'sass:math';
	@import '../styles/color';

	@mixin drop-shadow($color) {
		&:hover {
			filter: drop-shadow(16px 16px 20px $eylea-blue) invert(0%);
			transition: all 0.3s ease;
		}
		&:active {
			filter: drop-shadow(16px 16px 20px $eylea-blue) invert(0%);
		}
	}

	@mixin background($bg) {
		background: $bg;
		&:hover {
			background: darken($bg, 8%);
			transition: all 0.3s ease;
		}
		&:active {
			background: darken($bg, 25%);
		}
	}

	.stack {
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		width: 100%;
		background-color: $light-grey;
		border-radius: 20px;
		@include drop-shadow($eylea-blue);
	}

	.avatar-block {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;

		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		background: linear-gradient($eylea-blue, lighten($eylea-blue, 25%));
		padding: 10px 10px;

		.avatar-wrapper {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			vertical-align: middle;
			overflow: hidden;
			user-select: none;
			aspect-ratio: 1;
			max-width: 8rem;
			border-radius: 100%;
			background-color: $eylea-blue;
			border: none;

			.avatar-img {
				-webkit-filter: drop-shadow(5px 5px 5px #222);
				filter: drop-shadow(5px 5px 5px #222);
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: inherit;
			}
		}
	}

	.label {
		text-transform: uppercase;
		z-index: 10;
		margin: -10px auto;
		width: 80px;
		text-align: center;
		border-radius: 10px;
		background-color: $grey-800;
		color: $eylea-blue;
		/* offset-x | offset-y | blur-radius | spread-radius | color */
		box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
	}

	.content-block {
		padding: 1rem 2rem;
	}
</style>
