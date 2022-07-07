<script lang="ts">
	import Card from '$components/Card.svelte';
	import { caseStudies } from '$data/state';

	$: caseStudy = caseStudies[0]!;

	const arrayify = (obj: Object): Array<[string, string]> =>
		Object.entries(obj).map(([rowHeading, rowVal], index) => {
			const cleanedRowHeading = rowHeading.replaceAll('_', ' ');
			return [cleanedRowHeading, rowVal.toString()];
		});

	$: baselineCharaceristicsArray = arrayify(caseStudy.baseline_characteristics);
</script>

<div class="container flex">
	<!-- <ContainerQueryGrid>
		<Card
			label={'case 1'}
			rows={baselineCharaceristicsArray}
			avatarUrl={'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'}
		/>
	</ContainerQueryGrid> -->
	<a class="flex-item" href="/treatments/case-study">
		<Card {caseStudy} />
	</a>
</div>

<style lang="scss">
	@import '../../styles/color';

	a {
		text-decoration: none;
	}

	.container {
		padding: 2rem 4rem;
		width: 100%;
		height: 100%;
		background: linear-gradient($white, darken($white, 25%));
	}

	.flex {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
	}
	.flex-item {
		margin: auto 0;
		max-width: 300px;
	}
</style>
