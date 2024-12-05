<script>
        export let caseData;
</script>

<div class="votes-container">
        <div class="votes-block">
            <p>Voted in Favor</p>
            <div class="judge-circles">
                {#each caseData.left as judge (judge.name)}
                    <div class="judge-circle">
                        <img src="{judge.image}" alt="{judge.name}" title="{judge.name}" />
                    </div>
                {/each}
                {#if caseData.left?.length == 0}
                <p>None</p>
                {/if}
            </div>
        </div>

        <div class="votes-block">
            <p>Voted Against</p>
            <div class="judge-circles">
                {#each caseData.right as judge (judge.name)}
                    <div class="judge-circle">
                        <img src="{judge.image}" alt="{judge.name}" title="{judge.name}" />
                    </div>
                {/each}
                {#if caseData.right?.length == 0}
                    <p>None</p>
                {/if}
            </div>
        </div>
    <!-- {/if} -->
</div>

<style>
        .case-container {
        margin: 20px;
    }

    .votes-container {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
    }

    .votes-block {
        flex: 1;
        text-align: center;
    }

    .judge-circles {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 10px;
    }

    .center-judges {
        display: flex;
        justify-content: center;
        gap: 10px;
        flex-wrap: wrap;
        margin: 20px 0;
    }

    .judge-circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid steelblue;
    }

    .judge-circle img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>