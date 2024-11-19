<script>
	import { onMount, onDestroy } from "svelte";
	import { LayerCake, Svg } from "layercake";
	import Line from "$components/layercake/Line.svelte";
	import AxisX from "$components/layercake/AxisX.svg.svelte";
	import AxisY from "$components/layercake/AxisY.svg.svelte";
	import scrollama from "scrollama"; // Import Scrollama
	import mqData from "$components/demo/mq_data.csv";
	import BVB from "$components/cases/BVB.svelte";
	import { fade } from 'svelte/transition';
	
	let scroller = scrollama();

	// Parse the data
	let parsedData = mqData.map(d => ({
		x: +d.year,
		y: +d.value
	}));

	const x = "x";
	const y = "y";

	// Domains for the axes
	const xDomain = [
		Math.min(...parsedData.map(d => d[x])),
		Math.max(...parsedData.map(d => d[x]))
	];
	const yDomain = [
		Math.min(...parsedData.map(d => d[y])),
		Math.max(...parsedData.map(d => d[y]))
	];

	const padding = {
		top: 20,
		left: 50,
		bottom: 50,
		right: 20
	};

	let scrollIndex = 0; // Controlled by Scrollama
	let maxSteps = parsedData.length; // Total steps

	onMount(() => {

		// Set up Scrollama
		scroller
			.setup({
				step: ".scroll-section", // Target each scrollable section
				offset: 0.5, // Trigger in the middle of the viewport
				progress: true // Enable progress tracking
			})
			.onStepEnter((response) => {
				// Update the scroll index when a section is entered
				scrollIndex = response.index;
			})
			.onStepProgress((response) => {
				// Optionally use progress to handle fine-grained control
				console.log("Progress:", response.progress);
			});
	});

	onDestroy(() => {
		scroller.destroy();
	});

	// Define a function or array to determine when to render the component
	let selectedIndices = [0, 2, 5]; // Example: Only render on these indices

	function shouldRenderComponent(index) {
		return selectedIndices.includes(index); // Check if the current index is in the list
	}

	let circleCount = 9; // Number of circles

	// Define the data for each circle and its replacement at specific steps
	let circleData = Array.from({ length: circleCount }, (_, i) => ({
		id: i,
		color: 'steelblue',
		tooltip: `Circle ${i + 1}`,
		replaceAtStep: i + 3, // Circle fades out and is replaced at this step
		newCircle: {
			id: `new-${i}`,
			color: 'coral',
			tooltip: `New Circle ${i + 1}`
		}
	}));

	let circles = Array.from({ length: circleCount }, (_, i) => ({
		initialY: 200 + i * 60, // Starting position (off-screen or hidden)
		finalY: 50 + i * 60, // Final position (in view)
		tooltipMessage: `Circle ${i + 1}` // Dynamic tooltip message
	}));

	let tooltipVisible = false;
	let tooltipPosition = { x: 0, y: 0 };
	let tooltipMessage = '';

	// Tooltip behavior
	function showTooltip(event, message) {
		tooltipVisible = true;
		tooltipMessage = message;
		tooltipPosition = { x: event.clientX, y: event.clientY };
	}

	function moveTooltip(event) {
		tooltipPosition = { x: event.clientX, y: event.clientY };
	}

	function hideTooltip() {
		tooltipVisible = false;
	}

</script>

<main>
	<div class="container">
<!-- Left: Scrolling Content -->
		<div class="scroll-sections">
			{#each Array(maxSteps) as _, i}
				<div class="scroll-section">
					{#if shouldRenderComponent(i)}
					<BVB />
					{/if}
				</div>
			{/each}
		</div>

		<!-- Right: Sticky Graph -->
		<div class="sticky-graph">
			<LayerCake
				data={parsedData}
				x={d => d[x]}
				y={d => d[y]}
				xDomain={xDomain}
				yDomain={yDomain}
				padding={padding}
			>
				<Svg>
					<AxisX gridlines baseline />
					<AxisY gridlines baseline />
					<Line stroke="steelblue" strokeWidth="5" step={scrollIndex + 1} />
				</Svg>
			</LayerCake>
		</div>

		<div class="sticky-judges">
			{#each circleData as circle, i}
				<!-- Render the current circle if the scroll index is below its replace step -->
				{#if scrollIndex < circle.replaceAtStep}
					<div
						class="circle"
						style="background-color: {circle.color};"
						in:fade
						out:fade
						on:mouseenter={(e) => showTooltip(e, circle.tooltip)}
						on:mousemove={(e) => moveTooltip(e)}
						on:mouseleave={() => hideTooltip()}
					></div>
				{:else}
					<!-- Render the replacement circle -->
					<div
						class="circle"
						style="background-color: {circle.newCircle.color};"
						in:fade
						out:fade
						on:mouseenter={(e) => showTooltip(e, circle.newCircle.tooltip)}
						on:mousemove={(e) => moveTooltip(e)}
						on:mouseleave={() => hideTooltip()}
					></div>
				{/if}
			{/each}
		</div>

		<!-- Tooltip -->
		{#if tooltipVisible}
		<div
			class="tooltip"
			style="left: {tooltipPosition.x + 10}px; top: {tooltipPosition.y + 10}px;"
		>
			{tooltipMessage}
		</div>
		{/if}

	</div>
</main>

<style>

	.sticky-judges {
		position: relative;
		width: 100px;
		height: 50%; /* Full height of the container */
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* Spread circles evenly */
		align-items: center; /* Center circles horizontally */
	}

	.circle {
		width: 20px;
		height: 20px;
		background-color: steelblue;
		border-radius: 50%;
		border: 2px solid white;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}

	.tooltip {
		position: absolute;
		background-color: #333;
		color: white;
		padding: 5px 10px;
		border-radius: 5px;
		font-size: 0.9rem;
		pointer-events: none;
		white-space: nowrap;
		transform: translate(-50%, -50%);
	}


	main {
		display: flex;
		flex-direction: column; /* Allow the entire page to scroll naturally */
	}

	.container {
		display: flex;
		width: 100%;
		height: auto; /* Allow the page height to grow naturally */
	}

	.scroll-sections {
		width: 20%; /* Text occupies 20% of the width */
	}

	.scroll-section {
		height: 100vh; /* Each section takes up full viewport height */
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		scroll-snap-align: start; /* Snap each section to the top when scrolling */
	}

	.sticky-graph {
		width: 70%; /* Graph occupies 80% of the width */
		position: sticky;
		top: 0;
		height: 100vh; /* Full height to match the viewport */
		padding: 1rem;
		background: white; /* Ensure it doesn’t overlay the text */
	}

	.sticky-judges {
		width: 10%; /* Graph occupies 80% of the width */
		position: sticky;
		top: 0;
		height: 100vh; /* Full height to match the viewport */
		padding: 1rem;
		background: white; /* Ensure it doesn’t overlay the text */
	}

</style>
