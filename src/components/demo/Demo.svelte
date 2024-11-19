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
	import DemoLayerCake from "$components/demo/Demo.LayerCake.svelte";
</script>

<div id="demo">
	<h2>Judges should apply the law impartially based on the facts and evidence </h2>
	<p>But how has judicial discretion and personal philosophies evolved in the highest court of the land?</p>

	<iframe src="https://giphy.com/embed/sqQokbX82YeWr9CEMY" width="480" height="259" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/whitneytimmers-legal-scales-of-justice-kaufman-law-sqQokbX82YeWr9CEMY"></a></p>

	<h3>Martin-Quinn Scores</h3>
	<p>
		M-Q scores are dynamic metrics used to gauge the ideology of a U.S. Supreme Court Justice based on their voting record.
	</p>

	<p>
		Thoretically these score are unbounded, with negative values trending towards a liberal philosophy and positives towards a conservative philosophy
	</p>

	<!-- <DemoLink />
	<DemoImg />
	<DemoSvelteElement />
	<DemoSvelteComponent />
	<DemoMicroCMS />
	<DemoTip />
	<DemoFigure />
	<DemoScrolly /> -->
</div>
<DemoLayerCake id="dembo" />
<div id="demo">
	<DemoLink />
</div>

<style>
	#demo {
		max-width: 40rem;
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
