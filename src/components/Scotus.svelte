<script>

import DemoTip from "$components/demo/Demo.Tip.svelte";

</script>

<h3>
    The Supreme Court of the United States
</h3>

<p>
    The Court is the highest tribunal in the Nation for all cases and controversies arising under the Constitution or the laws of the United States. 
    As the final arbiter of the law, the Court is charged with ensuring the American people the promise of equal justice under law and, thereby, also functions as guardian and interpreter of the 
    <span class="tooltip"> 
        Constitution. 
            <span class="tooltip-text">The Constitution is the supreme law of the United States. It defines the branches of government and the basic rights of citizens.</span>
    </span>
</p>

<style>
    p {
        color: black;
        text-align: left;

        padding-left: 10%;
        padding-right: 10%;
    }

    .tooltip {
            position: relative;
            display: inline-block;
            text-decoration: none;
            color: black;
            cursor: pointer;
    }

    .tooltip::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -2px; /* Adjust for spacing below text */
            width: 100%;
            height: 1px;
            border-bottom: 1px dashed; /* Creates the broken line effect */
    }

    .tooltip .tooltip-text {
            visibility: hidden;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 120%; /* Position above the word */
            left: 50%;
            transform: translateX(-50%);
            width: 200px; /* Adjust width as needed */
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 14px;
    }

    .tooltip:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
    }
</style>