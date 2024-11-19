<script>
	import { getContext } from "svelte";
	import { line, curveLinear } from "d3";
	
	// Destructure context with explicit logging
	const { data, xGet, yGet } = getContext("LayerCake");
	
	// Component props
	export let stroke = "steelblue";
	export let strokeWidth = 2;
	export let curve = curveLinear;
	export let step = 1;
	
	// Reactive path generation
	$: {
		// Ensure all required context is available
		if ($data && $xGet && $yGet) {
			console.log('Data received:', $data);
			console.log('Current step:', step);
			
			// Create path generator
			const pathGenerator = line().x($xGet).y($yGet).curve(curve);
			
			// Slice data based on current step
			const visibleData = $data.slice(0, step);
			
			console.log('Visible data:', visibleData);
			
			// Generate path
			pathD = pathGenerator(visibleData);
			
			console.log('Generated path:', pathD);
		} else {
			console.warn('Incomplete context for path generation');
		}
	}
	
	// Track path length for animation
	$: if (path) {
		totalLength = path.getTotalLength();
	}
	
	// Local variables
	let path;
	let pathD;
	let totalLength = 0;
	</script>
	
	<path
		bind:this={path}
		d={pathD}
		{stroke}
		stroke-width={strokeWidth}
		fill="none"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>