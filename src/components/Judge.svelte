<script>
    export let url;       // The URL of the image
    export let startYear; // The start year
    export let endYear;   // The end year
    export let name;      // The name of the judge
    export let curYear;   // The current year

    let isVisible = false; // Controls rendering visibility
    let animating = false; // Controls animation state

    // Split the name into words
    let nameParts = name.split(' ');

    // Calculate the split point, ensuring the right part gets the extra word if the count is odd
    let midIndex = Math.ceil(nameParts.length / 2);

    // Split the name into two parts
    let firstPart = nameParts.slice(0, midIndex);
    let secondPart = nameParts.slice(midIndex);

    // Join the parts back together with a space
    let firstPartString = firstPart.join(' ');
    let secondPartString = secondPart.join(' ');

</script>

{#if curYear >= startYear && curYear <= endYear}
    <div 
        class="judge-container" 
        style="opacity: {curYear >= startYear && curYear <= endYear ? 1 : 0}; transition: opacity 0.5s;"
    >
        <div class="circle">
            <img src={url} alt={name} />
            <div class="name-overlay">
                    <span class="name-word">{firstPartString}</span>
                    <span class="name-word">{secondPartString}</span>
            </div>
        </div>
    </div>
{/if}

<style>
    .judge-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: Arial, sans-serif;
        text-align: center;
    }

    .circle {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #ccc;
        cursor: pointer;
        transition: transform 0.3s ease-in-out;
        text-align: center;
    }

    .circle img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .name-overlay {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        text-align: center;
        padding: 5px 0;
        font-size: 14px;
        font-weight: bold;
        border-radius: 0 0 10px 10px;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
        transform: translateY(100%);
        opacity: 0;
        z-index: 2;
    }

    .name-word {
        display: block; /* Forces each word to be on its own line */
        margin-bottom: 0.1px; /* Optional: Adds a little space between words */
    }

    .circle:hover .name-overlay {
        transform: translateY(0);
        opacity: 1;
    }

    .animate-in {
        animation: easeIn 500ms ease forwards;
    }

    .animate-out {
        animation: easeOut 500ms ease forwards;
    }

    @keyframes easeIn {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes easeOut {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
</style>
