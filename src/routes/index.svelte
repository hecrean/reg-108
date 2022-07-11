<script lang="ts">
	import FadeInBlock from '$components/FadeInBlock.svelte';
	import ScrollCorridor from '$components/ScrollCorridor.svelte';
	import EyleaLogo from '$icons/EyleaLogo.svelte';
</script>

<!-- Landing Page -->

<main>
	<!-- <header class:top-navbar={true}>
		<div class:right-corner={true}>
			<div class:flex-col={true}>
				<button class:home-button={true}>
					<svg viewBox="0 0 24 24" fill="none" class:home-svg={true}
						><path
							d="M4 4.5H20V7.5H4V4.5Z"
							fill="currentColor"
							class="origin-center transition-transform duration-300 ease-in-out group-hover:transform group-hover:scale-x-50 group-focus-visible:transform group-focus-visible:scale-x-50"
						/><path d="M0 10.5H24V13.5H0V10.5Z" fill="currentColor" /><path
							d="M4 16.5H20V19.5H4V16.5Z"
							fill="currentColor"
							class="origin-center transition-transform duration-300 ease-in-out group-hover:transform group-hover:scale-x-50 group-focus-visible:transform group-focus-visible:scale-x-50"
						/></svg
					>
				</button>
			</div>
		</div>
	</header> -->
	<article class:grid={true} />

	<!-- <div class="centered" out:fly={{ y: -20, duration: 800 }}>
		{#each 'EYLEA' as char, i}
			<span in:fade={{ delay: 1000 + i * 150, duration: 800 }}>{char}</span>
		{/each}
	</div> -->
	<FadeInBlock>
		<span class:eylea-logo={true}>
			<EyleaLogo />
		</span>
	</FadeInBlock>

	<FadeInBlock>
		<span class:section-row={true} style="font-size: 20rem;">E Y L E A</span>
	</FadeInBlock>
	<FadeInBlock>
		<span class:section-row={true} style="font-size: 16rem;">A F L I B -</span>
	</FadeInBlock>
	<FadeInBlock>
		<span class:section-row={true} style="font-size: 13rem;">- E R C E P T </span>
	</FadeInBlock>
	<FadeInBlock>
		<span class:section-row={true} style="font-size: 10rem;">I N J E C T I O N </span>
	</FadeInBlock>
	<FadeInBlock>
		<span class:section-row={true} style="font-size: 8rem;">F O R</span>
	</FadeInBlock>
	<FadeInBlock>
		<span class:section-row={true} style="font-size: 6rem;">I N T R A V I T R E A L</span>
	</FadeInBlock>

	<FadeInBlock>
		<span class:section-row={true} style="font-size: 4rem;"> I N J E C T I O N</span>
	</FadeInBlock>

	<ScrollCorridor sectionName="Case Studies" routeAtEndOfCorridor="/treatments/case-studies" />
</main>

<style lang="scss">
	@import '../styles/color';

	main {
		background-color: white;
		min-height: 100vh;
	}

	.eylea-logo {
		margin: 0 auto;
		width: 50vw;
		height: 50vh;
	}

	.section-row {
		text-align: center;
		width: 100%;
		margin-bottom: 4rem;
	}

	/* header */
	.top-navbar {
		position: sticky;
		top: 0;
		z-index: 20;
		height: 0rem;

		.right-corner {
			position: absolute;
			top: 0;
			right: 0;
		}

		.flex-col {
			padding: 20px;
			display: flex;
			align-items: center;
			flex-direction: column;
		}

		.home-button {
			position: relative;
			padding: 0;
			color: inherit;
			cursor: pointer;
			background-color: transparent;
			background-image: none;
			-webkit-appearance: button;
			text-transform: none;
			border: none;
		}
		.home-svg {
			width: 20px;
			display: block;
		}
	}

	.grid {
		padding-top: 5rem;

		/* Take the remaining width */
		flex-direction: column;
		flex-grow: 1;
		display: grid;
		justify-items: center;
		align-items: center;

		/*
      On large screens, it will take up 65ch width. On smaller screens,
      where there isn't enough horizontal space for 65 characters,
      it is clamped to 100% of the available container width
      */
		grid-template-columns:
			1fr
			#{'min(140ch, calc(100% - 64px))'}
			1fr;
		// grid-template-columns: 1fr 100fr 1fr;
		// grid-column-gap: 32px;
		grid-column-gap: 0px;
		grid-auto-rows: min-content; /*
      By default, children will be slotted into the first available grid cell.
      We want to override this default behaviour though; all children should sit
      in the center column, leaving the first and third columns empty.
      In CSS Grid, columns are 1-indexed, so 2 is a reference to the middle column.
      */
		& > * {
			grid-column: 2 / 3;
		}
		/*
      Allows a specific child to bust out of that column, and span all 3 columns.
      1 / 4 is a start/end syntax; we're saying the element should start on Column 1
      (inclusive) and span all the way to Column 4 (exclusive). (we can use -1 to index last)
      */
		& > *[data-full-bleed='true'] {
			grid-column: 1 / -1;
		}
	}

	.scroll-counter-container {
		width: 100%;
		position: relative;
		height: 500vh;
		max-width: 1920rem;
		margin-left: auto;
		margin-right: auto;
		box-sizing: content-box;

		.fullly-covering-sticky-container {
			display: flex;
			position: sticky;
			top: 0;
			justify-content: center;
			align-items: center;
			height: 100vh;
		}
		.ring-title-container {
			display: flex;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 10;
			justify-content: center;
			align-items: center;

			.ring-title {
				text-align: center;
			}
		}

		.ring-container {
			width: 100%;
			max-width: 20rem;

			.square-aspect-ratio {
				aspect-ratio: 1;
			}
		}
	}

	.bottom-right-overlay {
		position: absolute;
		left: 0;
		bottom: 4rem;
		z-index: 20;
		writing-mode: vertical-rl;

		a {
			text-transform: uppercase;
			color: inherit;
		}
	}
	.circle-svg {
	}
</style>
