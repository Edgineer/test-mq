<script>
    // Props for the component
    export let title;
    export let description;
    export let year;
    export let image;
</script>

<section id="event">
    <div>
        <span class="title">{title} </span>({year})
    </div>
    <img src={image} />
    <p>{description}</p>
</section>

<style>
    img {
        width: 256px;
        height: auto;
        padding-left: 10%;
        
    }

    .title {
        font-weight: bold;
    }

    #event {
        padding: 16px;
        margin: 8px 0;
        max-width: 300px;
        text-align: center;
    }
</style>

