<script>
    // Props for the component
    export let title;
    export let description;
    export let year;
    export let image;
</script>

<section id="event">
    <h2>{title}</h2>
    <p>{description}</p>
    <p><strong>Year:</strong> {year}</p>
    <img src={image} alt="event" />
</section>

<style>
    img {
        width: 128px;
        height: auto;
    }

    #event {
        padding: 16px;
        margin: 8px 0;
        max-width: 300px;
        text-align: center;
    }
</style>

