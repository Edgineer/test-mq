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
        visibleJudges = judgeMap.get(curYearForJudge) || [];
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
                    <text 
                        x="50%" 
                        y="0" 
                        text-anchor="middle" 
                        font-size="16" 
                        font-weight="bold"
                    >
                        SCOTUS Mean MQ Score
                    </text>
                    {#if parsedData && scrollIndex !== null}
                        <Line stroke="steelblue" strokeWidth="5" step={scrollIndex + 1} />
                    {/if}
                    <AxisX gridlines baseline ticks={20} />
                    <AxisY gridlines baseline ticks={4} />
                </Svg>
            </LayerCake>
        </div>
    </div>

    <!-- Judges Section -->
    <div class="sticky-judges">
        {#if visibleJudges.length > 0}
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
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        overflow: hidden; /* Prevent full page scrolling */
    }

    /* Outer container for scrollable sections and sticky graph */
    .outer-container {
        display: flex;
        width: 100%;
        height: 80vh; /* Full height minus judges section */
    }

    /* Scroll-sections: Left side */
    .scroll-sections {
        width: 30%;
        height: 100%;
        overflow-y: scroll; /* Make left side scrollable */
        scroll-snap-type: y mandatory; /* Enable snapping */
    }

	/* Styling the scrollbar */
	.scroll-sections::-webkit-scrollbar {
		width: 12px; /* Adjust scrollbar width */
	}

	.scroll-sections::-webkit-scrollbar-thumb {
		background-color: #888; /* Scrollbar thumb color */
		border-radius: 6px; /* Rounded corners for thumb */
		border: 2px solid #ccc; /* Adds spacing and a contrasting border */
	}

	.scroll-sections::-webkit-scrollbar-thumb:hover {
		background-color: #555; /* Darker color on hover */
	}

	.scroll-sections::-webkit-scrollbar-track {
		background: #f1f1f1; /* Scrollbar track color */
		border-radius: 6px; /* Rounded corners for track */
	}


    .scroll-section {
        height: 100vh; /* Full viewport height for each section */
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        scroll-snap-align: start; /* Snap to start */
    }

    /* Sticky Graph: Right side */
    .sticky-graph {
        width: 70%;
        height: 100%;
        position: sticky;
        top: 0;
        background: white;
        padding: 1rem;
    }

    /* Judges Section */
    .sticky-judges {
        width: 100%;
        height: 20vh; /* Occupies 20% of the viewport */
        display: flex;
        justify-content: center;
        align-items: center;
        background: white;
        border-top: 1px solid #ccc;
        padding: 0.5rem;
    }
</style>
