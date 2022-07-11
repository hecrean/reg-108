<script lang="ts">
	import ExpandableFooter from '$components/ExpandableFooter.svelte';
	import FadeInBlock from '$components/FadeInBlock.svelte';
	import Hoverable from '$components/Hoverable.svelte';
	import IconButton from '$components/IconButton.svelte';
	import ImageWithOverlay from '$components/ImageWithOverlay.svelte';
	import Modal from '$components/Modal.svelte';
	import Navbar from '$components/Navbar.svelte';
	import Sidebar from '$components/Sidebar.svelte';
	import ChevronRightIcon from '$icons/ChevronRightIcon.svelte';
	import animationVideo from '$assets/animation-video/REG108_Eylea_Preview_576p_220630.mp4';

	let sidebarOpen: boolean = false;
	let bottombarOpen: boolean = false;
	let modalOpen = false;
	let footerOpen = false;
</script>

<div class:fullpage-container={true} class="flex-col">
	<Modal bind:open={modalOpen}>
		<video controls width="100%">
			<source src={animationVideo} type="video/mp4" />

			Sorry, your browser doesn't support embedded videos.
		</video>
	</Modal>
	<Navbar bind:sidebar={sidebarOpen} />
	<Sidebar bind:open={sidebarOpen}>
		<div class="grid-layout" class:fade-in={sidebarOpen}>
			<div class="central-grid-col">
				<FadeInBlock>
					<div class="flex-col">
						<ImageWithOverlay
							url="/Aflibercept+VEGF/REG108_Aflibercept+VEGF_Aa.jpg"
							on:click={() => (modalOpen = true)}
						>
							<p>WATCH THE ANIMATION</p>
							<IconButton bgColor={'rgb(245,206,70'}>
								<ChevronRightIcon />{' '}
							</IconButton>
						</ImageWithOverlay>
						<a href="/treatments/case-studies">
							<ImageWithOverlay url="/Retina_CS/REG108_Retina_CS_Aa.jpg">
								<p>SEE THE CASE STUDIES</p>
								<IconButton
									bgColor={'rgb(245,206,70'}
									on:click={() => {
										modalOpen = true;
									}}
								>
									<ChevronRightIcon />{' '}
								</IconButton>
							</ImageWithOverlay>
						</a>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
							incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
							exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
							dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</p>
					</div>
				</FadeInBlock>
			</div>
		</div>
	</Sidebar>
	<main><slot /></main>
	<ExpandableFooter>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</ExpandableFooter>
</div>

<style lang="scss">
	@import '../../styles/breakpoints';

	$header-height: 50px;
	$footer-height: 40px;

	$white: hsl(210, 40%, 96%);

	// primary colors
	$eylea-blue: rgb(0, 68, 107);
	$eylea-yellow: rgb(255, 209, 0);

	//secondary colors
	$light-blue: rgba(173, 223, 237, 0.4);
	$light-blue-accent: rgb(173, 223, 237);
	$deep-blue: rgb(0, 43, 84);

	$teal: rgb(96, 205, 203);
	$teal-accent-1: rgba(96, 205, 203, 0.35);
	$teal-accent-2: rgba(96, 205, 203, 0.7);
	$dark-teal: rgb(44, 145, 153);

	$light-grey: rgb(227, 228, 229);
	$grey-800: rgb(136, 138, 140);

	$violet: rgb(147, 167, 203);

	p {
		padding: 2rem 2.5rem 0rem 2.5rem;
	}

	.fullpage-container {
		height: 100%;
		width: 100%;
		max-height: 100vh;
		max-width: 100vw;
		overflow-x: hidden;
	}
	.flex-col {
		display: flex;
		flex-direction: column;
	}


	main {
		width: 100%;
		max-width: 100vw;
		max-height: calc(100vh - $header-height - $footer-height);
		flex: 1;
	}

	// footer {
	// 	scroll-behavior: contain;
	// 	&[data-expanded='true'] {
	// 		height: calc($footer-height + 100vh);
	// 		background-color: $eylea-blue;
	// 		color: white;
	// 	}
	// 	position: absolute;
	// 	top: calc(100vh - $footer-height);
	// 	height: $footer-height;
	// 	width: 100%;
	// 	background-color: $light-blue;
	// 	color: $eylea-blue;
	// 	margin: auto 0;
	// 	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	// }

	.fade-in {
		opacity: 0;
		animation: fade-in 1s ease 0.3s forwards;
		transition: all 0.3s;
		padding: 1rem;
	}
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.grid-layout {
		padding-top: 2rem;
		width: 100%;
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
		grid-auto-rows: min-content;
	}
	.central-grid-col {
		grid-column: 2 / 3;
		width: 100%;
	}
</style>
