<script>
    import { LayerCake, Svg } from "layercake";
    import AxisX from "$components/layercake/AxisX.svg.svelte";
    import { scaleLinear } from "d3-scale";
	import MqCases from "$components/MqCases.svelte";

    let currentIndex = 0;

    // Judge data structure
    let judges = {
        "0": [
            { name: "John G. Roberts, Jr.", mqScore: 0, image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
            { name: "Ruth Bader Ginsburg", mqScore: 0, image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
            { name: "Thurgood Marshall", mqScore: 0, image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
            { name: "Antonin Scalia", mqScore: 0, image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            { name: "Sandra Day O'Connor", mqScore: 0, image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" }
        ],
        "1": [
            { name: "John G. Roberts, Jr.", mqScore: 1, image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
            { name: "Ruth Bader Ginsburg", mqScore: -1, image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
            { name: "Thurgood Marshall", mqScore: -1, image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
            { name: "Antonin Scalia", mqScore: 1, image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            { name: "Sandra Day O'Connor", mqScore: -1, image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" }
        ],
        "2": [
            { name: "John G. Roberts, Jr.", mqScore: 2, image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
            { name: "Ruth Bader Ginsburg", mqScore: -2, image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
            { name: "Thurgood Marshall", mqScore: -2, image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
            { name: "Antonin Scalia", mqScore: 2, image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            { name: "Sandra Day O'Connor", mqScore: -2, image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" }
        ],
        "3": [
            { name: "John G. Roberts, Jr.", mqScore: 1, image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
            { name: "Ruth Bader Ginsburg", mqScore: -3, image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
            { name: "Thurgood Marshall", mqScore: -1, image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
            { name: "Antonin Scalia", mqScore: 1, image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            { name: "Sandra Day O'Connor", mqScore: -1, image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" }
        ]
    };

    // Get judges for the current index
    $: currentJudges = judges[currentIndex];

    // X-axis settings
    const xDomain = [-3, 3];
    const svgWidth = 800; // Width of the SVG
    const padding = { top: 20, left: 0, bottom: 50, right: 20 };

    // Scale for x-axis
    const xScale = scaleLinear()
        .domain(xDomain)
        .range([padding.left, svgWidth - padding.right]);

    const judgeCircleRadius = 20;
    const verticalSpacing = 70; // Space between each judge vertically

    function goToNextState() {
        if (currentIndex < Object.keys(judges).length - 1) {
            currentIndex++;
        }
    }

    function goToPreviousState() {
        if (currentIndex > 0) {
            currentIndex--;
        }
    }
</script>

<main>
    <MqCases index={currentIndex} />
    <div class="graph-container">
        <LayerCake
            data={currentJudges}
            x={d => d.mqScore}
            xDomain={xDomain}
            padding={padding}
        >
            <Svg width={svgWidth}>
                <text 
                    x="50%" 
                    y="-10" 
                    text-anchor="middle" 
                    font-size="16" 
                    font-weight="bold"
                >
                    MQ Scores of Judges
                </text>

                <!-- X-Axis -->
                <AxisX gridlines baseline ticks={5} />

                <!-- Judges (placed after the graph lines) -->
                {#each currentJudges as judge, i (judge.name)}
                    <g 
                        class="judge-circle"
                        style="transform: translate({xScale(judge.mqScore)}px, {(i * verticalSpacing) + 20}px);"
                    >
                        <circle 
                            cx="0" 
                            cy="0" 
                            r="{judgeCircleRadius}" 
                            fill="white" 
                            stroke="grey" 
                            stroke-width="2"
                        />
                        <image 
                            href="{judge.image}" 
                            x="-{judgeCircleRadius}" 
                            y="-{judgeCircleRadius}" 
                            width="{judgeCircleRadius * 2}" 
                            height="{judgeCircleRadius * 2}" 
                            clip-path="circle({judgeCircleRadius}px)"
                        />
                    </g>
                {/each}
            </Svg>
        </LayerCake>
    </div>

    <div class="controls">
        <button on:click={goToPreviousState} disabled={currentIndex === 0}>
            Previous Case
        </button>
        <button on:click={goToNextState} disabled={currentIndex === Object.keys(judges).length - 1}>
            Next Case
        </button>
    </div>
</main>

<style>
    .graph-container {
        width: 100%;
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    .judge-circle {
        transition: transform 0.5s ease; /* Smooth transition for movement */
        position: relative; /* Ensure layering respects z-index */
    }

    .controls {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .controls button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }
</style>
