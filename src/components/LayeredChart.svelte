<script>
	import { LayerCake, Svg, Html, Canvas } from 'layercake';

	const data = [
		{ x: 0, y: 1 },
		{ x: 1, y: 2 },
		{ x: 2, y: 3 }
	];
</script>

<div class="chart-container">
	<LayerCake x="x" y="y" {data}>
		<Svg />

		<Canvas />

		<Html />
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 500px;
	}
</style>
