<script>
	import { getContext } from "svelte";

	const { padding, xRange, yScale } = getContext("LayerCake");

	export let gridlines = true;
	export let tickMarks = false;
	export let xTick = 0;
	export let yTick = 0;
	export let dxTick = 0;
	export let dyTick = -4;
	export let textAnchor = "start";
	export let formatTick = (d) => d;
	export let ticks = 7;

	// Labels for the top and bottom of the Y-axis
	export let topLabel = "Conservative"; // Set a default for demonstration
	export let bottomLabel = "Liberal";

	$: tickVals = Array.isArray(ticks)
		? ticks
		: typeof ticks === "function"
		? ticks($yScale.ticks())
		: $yScale.ticks(ticks);
</script>

<g class="axis y-axis" transform="translate({-$padding.left}, 0)">
	<!-- Top Label -->
	<text
		x={$xRange[0] + 50}
		y={$yScale.range()[1] - 20} 
		style="text-anchor: middle; font-size: 0.9em; font-weight: bold;">
		{topLabel}
	</text>

	<!-- Bottom Label -->
	<text
		x={$xRange[0] + 30} 
		y={$yScale.range()[0] + 20} 
		style="text-anchor: middle; font-size: 0.9em; font-weight: bold;">
		{bottomLabel}
	</text>

	<!-- Ticks and Gridlines -->
	{#each tickVals as tick}
		<g
			class="tick tick-{tick}"
			transform="translate({$xRange[0]}, {$yScale(tick)})"
		>
			{#if gridlines !== false}
				<line class="gridline" x2="100%" y1={yTick} y2={yTick} />
			{/if}
			{#if tickMarks === true}
				<line class="tick-mark" x1="0" x2={6} y1={yTick} y2={yTick} />
			{/if}
			<text
				x={xTick}
				y={yTick}
				dx={dxTick}
				dy={dyTick}
				style="text-anchor:{textAnchor};">{formatTick(tick)}</text
			>
		</g>
	{/each}
</g>

<style>
	.tick {
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: var(--color-gray-300);
	}
	.tick .gridline {
		stroke-dasharray: 4px 4px;
	}

	.tick text {
		fill: var(--color-gray-600);
	}

	.axis text {
		fill: var(--color-gray-800); /* Darker text for the labels */
	}
</style>
