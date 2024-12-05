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
        <h2>See our interactive justice dashboard</h2>
        <p><a href="https://public.tableau.com/app/profile/izzy.valdivia/viz/SupremeCourtJusticeIdeologies/Comparison?publish=yes" target="_blank">Click here!</a></p>
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
</style>
