<script>
    import throttle from "lodash/throttle";
    import { writable } from "svelte/store";
    import { onMount, onDestroy } from "svelte";
    import { LayerCake, Svg } from "layercake";
    import Line from "$components/layercake/Line.svelte";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import AxisY from "$components/layercake/AxisY.svg.svelte";
    import scrollama from "scrollama"; 
    import mqData from "$components/demo/mq_data.csv";
    import events from "$components/demo/events.csv";
	import judge from "$components/demo/judge.csv";
    import Event from "$components/Event.svelte";
    import Judge from "$components/Judge.svelte";
    import { parseCSVToMap } from "$utils/parseCSVToMap.js";
	import { parseJudgesToMap } from "$utils/parseJudgesCSV";

    let scroller = scrollama();

    // Reactive store for scrollIndex
    const scrollIndexStore = writable(0);
    let scrollIndex = 0; // Local value for immediate updates

    // Judge-specific year
    let curYearForJudge = null;

	let judgeMap = new Map(); // Map to hold the parsed judge data
	let visibleJudges = []; // List of judges for the current year

    const years = Array.from({ length: 2022 - 1937 + 1 }, (_, i) => 1937 + i); // Generate range from 1937 to 2022

    // Throttled handler for Scrollama
    const throttledStepEnter = throttle((response) => {
        scrollIndex = response.index;
        scrollIndexStore.set(scrollIndex); // Update the store for LayerCake
        curYearForJudge = 1937 + scrollIndex; // Update Judge's year directly
		visibleJudges = judgeMap.get(curYearForJudge) || []
		console.log(`Vis Judges are: ${visibleJudges}`)

    }, 100);

    // Parse data
    let parsedData = mqData.map(d => ({
        x: +d.year,
        y: +d.value
    }));
    const x = "x";
    const y = "y";
    const xDomain = [
        Math.min(...parsedData.map(d => d[x])),
        Math.max(...parsedData.map(d => d[x]))
    ];
    const yDomain = [
        Math.min(...parsedData.map(d => d[y])) - 3,
        Math.max(...parsedData.map(d => d[y])) + 3
    ];
    const padding = { top: 20, left: 50, bottom: 50, right: 20 };

    let eventMap = parseCSVToMap(events);

    onMount(async () => {
        scroller
            .setup({
                step: ".scroll-section",
                offset: 0.5,
                progress: true,
            })
            .onStepEnter(throttledStepEnter);
		
		try {
            judgeMap = parseJudgesToMap(judge);
        } catch (error) {
            console.error("Error parsing judges:", error);
        }
    });

    onDestroy(() => {
        scroller.destroy();
    });
</script>

<main>
	<div class="outer-container">
		<!-- Left: Scrolling Content -->
		<div class="scroll-sections">
			{#each years as year}
				<div class="scroll-section">
					{#if eventMap.has(year)}
						<Event 
							title={eventMap.get(year).title} 
							description={eventMap.get(year).description} 
							year={year} 
							image={eventMap.get(year).image} 
						/>
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
					{#if parsedData && scrollIndex !== null}
						{console.log("Rendering Line: step =", scrollIndex + 1)}
						<Line stroke="steelblue" strokeWidth="5" step={scrollIndex + 1} />
					{/if}
					<AxisX gridlines baseline />
					<AxisY gridlines baseline />
				</Svg>
			</LayerCake>
		</div>
	</div>

	<!-- Bottom: Judges Section -->
	<div class="sticky-judges">
		{#each visibleJudges as judge (judge.name)}
			<Judge
				key={curYearForJudge}
				url={judge.url}
				name={judge.name}
				startYear={judge.startYear}
				endYear={judge.endYear}
				curYear={curYearForJudge}
			/>
    	{/each}
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		overflow: hidden;
	}

	/* Outer container for scrollable sections and sticky graph */
	.outer-container {
		display: flex;
		flex-direction: row; /* Side-by-side layout */
		width: 100%;
		height: 80vh; /* Occupies 80% of the viewport height */
		overflow-y: scroll; /* Allow scrolling */
		scroll-snap-type: y mandatory; /* Enable snapping for scroll-sections */
	}

	/* Scroll-sections: Left side */
	.scroll-sections {
		width: 20%; /* Occupies 20% of the width */
		height: 100%; /* Full height of the outer-container */
		display: flex;
		flex-direction: column;
	}

	.scroll-section {
		height: 100vh; /* Each section takes up the full viewport height */
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		scroll-snap-align: start; /* Snap sections to the viewport on scroll */
	}

	/* Sticky Graph: Right side */
	.sticky-graph {
		width: 80%; /* Occupies 80% of the width */
		height: 100%; /* Full height of the outer-container */
		position: sticky;
		top: 0; /* Sticks to the top of the viewport */
		background: white;
		padding: 1rem;
	}

	/* Judges Section: Positioned below */
	.sticky-judges {
		width: 100%; /* Full width */
		height: 20vh; /* Occupies 20% of the viewport height */
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		background: white;
	}


</style>

