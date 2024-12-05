<script>
	import DemoLink from "$components/demo/Demo.Link.svelte";
	import DemoImg from "$components/demo/Demo.Img.svelte";
	import DemoButtonSet from "$components/demo/Demo.ButtonSet.svelte";
	import DemoRange from "$components/demo/Demo.Range.svelte";
	import DemoSelect from "$components/demo/Demo.Select.svelte";
	import DemoToggle from "$components/demo/Demo.Toggle.svelte";
	import DemoSortTable from "$components/demo/Demo.SortTable.svelte";
	import DemoSvelteElement from "$components/demo/Demo.SvelteElement.svelte";
	import DemoSvelteComponent from "$components/demo/Demo.SvelteComponent.svelte";
	import DemoMicroCMS from "$components/demo/Demo.MicroCMS.svelte";
	import DemoFigure from "$components/demo/Demo.Figure.svelte";
	import DemoTip from "$components/demo/Demo.Tip.svelte";
	import DemoScrolly from "$components/demo/Demo.Scrolly.svelte";
	import Graph from "$components/Graph.svelte";
    import Banner from "$components/Banner.svelte";
    import Scotus from "$components/Scotus.svelte";
    import Law from "$components/Law.svelte";
    import Mq from "$components/Mq.svelte"
    import MqCalc from "$components/MqCalc.svelte"
    import MqGraph from "$components/MqGraph.svelte";
</script>

<Banner />
<div id="demo">

    <Scotus />
    <Law />
    <Mq />
    <MqCalc />
    <MqGraph />

	<!-- <DemoLink />
	<DemoImg />
	<DemoSvelteElement />
	<DemoSvelteComponent />
	<DemoMicroCMS />
	<DemoTip />
	<DemoFigure />
	<DemoScrolly /> -->
</div>
<Graph id="dembo" />
<div id="demo">

    <section id="demo-link">
        <h2>Open our dashboard for more insights</h2>
        <a href="https://public.tableau.com/app/profile/anthony.nguyen2248/viz/shared/JYCH24YM2" target="_blank" class="button">
            Open Tableau
        </a>
    </section> 
</div>

<style>
	#demo {
		max-width: 50rem;
		padding: 16px;
		margin: 0 auto;
	}
	#dembo {
		margin: 0 auto;
	}

	:global(#demo section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#demo section > section) {
		margin: 0 auto;
		padding-top: 0;
	}

	:global(#demo h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}

    #demo-link {
    text-align: center; /* Center the content */
    margin: 2rem 0; /* Add spacing around the section */
    }

    #demo-link h2 {
        margin-bottom: 1rem; /* Add spacing below the heading */
    }

    #demo-link .button {
        display: inline-block;
        padding: 0.75rem 1.5rem; /* Adjust padding for a button-like appearance */
        font-size: 1rem;
        font-weight: bold;
        color: white; /* Button text color */
        background-color: grey; /* Button background color */
        border: none; /* Remove default link styling */
        border-radius: 5px; /* Rounded corners */
        cursor: pointer; /* Pointer cursor to indicate it's clickable */
        text-decoration: none; /* Remove underline */
        box-shadow: 0 4px grey; /* Shadow for a 3D press effect */
        transition: transform 0.2s, box-shadow 0.2s; /* Smooth press effect */
    }

    #demo-link .button:active {
        transform: translateY(2px); /* Move down to simulate a press */
        box-shadow: 0 2px darkgrey; /* Reduce shadow for the press effect */
    }

    #demo-link .button:hover {
        background-color: darkgrey; /* Slightly darker background on hover */
    }


</style>
