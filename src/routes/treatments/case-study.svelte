<script lang="ts">
	import FullscreenCanvas from '$components/FullscreenCanvas.svelte';
	import IconButton from '$components/IconButton.svelte';

	import PatientInfo from '$components/PatientInfo.svelte';
	import Timeline from '$components/Timeline.svelte';
	import { caseStudies, type StageADT, type ViewADT } from '$data/state';
	import CellularEyeIcon from '$icons/CellularEyeIcon.svelte';
	import FundusIcon from '$icons/FundusIcon.svelte';
	import OctIcon from '$icons/OctIcon.svelte';
	import OverlayLayout from '$layouts/OverlayLayout.svelte';
	import Splitscreen from '$layouts/Splitscreen.svelte';
	import type { SplitScreenState } from '$stores/splitscreen';

	$: caseStudy = caseStudies[0]!;

	let splitscreen: SplitScreenState = 'equal';
	let view: ViewADT = 'fa';
	let stage: StageADT = 'baseline';
</script>

<Splitscreen bind:splitscreen>
	<PatientInfo slot="left" {caseStudy} bind:splitscreen />
	<FullscreenCanvas slot="right" bind:view bind:stage {caseStudy}>
		<OverlayLayout slot="canvas-overlay">
			<Timeline
				slot="foreground-top"
				radius={0.5}
				timelineItems={[{ stage: 'baseline' }, { stage: 'week24' }, { stage: 'week52' }]}
				bind:stage
			/>
			<div class="flex-row" class:hover-to-display={true} slot="foreground-bottom">
				<IconButton><OctIcon /></IconButton>
				<IconButton><FundusIcon /></IconButton>
				<IconButton><CellularEyeIcon /></IconButton>
			</div>
		</OverlayLayout>
	</FullscreenCanvas>
</Splitscreen>

<style lang="scss">
	button {
		pointer-events: all;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.hover-to-display {
		&:not(:hover) {
			opacity: 0.4;
		}
	}

	.video {
		width: 100%;
		object-fit: contain;
		border-radius: 0.5rem;
	}
</style>
