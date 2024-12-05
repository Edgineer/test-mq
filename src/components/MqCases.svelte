<script>
    import Votes from "$components/Votes.svelte";


    export let index;

    const casesDict = {
        "0": {
            "header": "Initial state",
            "description": "Assuming judges initially have no voting record and an MQ of zero",
            "center": [
                { name: "John G. Roberts, Jr.", image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
                { name: "Ruth Bader Ginsburg", image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
                { name: "Sandra Day O'Connor", image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" },
                { name: "Antonin Scalia", image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
                { name: "John G. Roberts, Jr.", image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
            ],
            "left": [],
            "right": [],
            "results": ""
        },
        "1": {
            "header": "Case 1: Should pets be considered dependents?",
            "description": "Law to let our furry friends help us save on taxes.",
            "left": [
                { name: "Thurgood Marshall", image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
                { name: "Ruth Bader Ginsburg", image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
                { name: "Sandra Day O'Connor", image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" },
            ],
            "right": [
                { name: "John G. Roberts, Jr.", image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
                { name: "Antonin Scalia", image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            ],
            "results": "Justices who voted together now all have the same MQ score"
        },
        "2": {
            "header": "Case 2: Should election day be a national holiday?",
            "description": "Get paid and get more time for civic duty",
            "left": [
                { name: "Thurgood Marshall", image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
                { name: "Ruth Bader Ginsburg", image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
                { name: "Sandra Day O'Connor", image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" },
            ],
            "right": [
                { name: "John G. Roberts, Jr.", image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
                { name: "Antonin Scalia", image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            ],
            "results": "The same vote split caused the mq scores continue to diverge bewteen the groups"
        },
        "3": {
            "header": "Case 3: Is RBG Notorious?",
            "description": "Affectionately known as the Notorious RBG, but was Ruth Bader Ginsburg the real deal?",
            "left": [
                { name: "Ruth Bader Ginsburg", image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
            ],
            "right": [
                { name: "Thurgood Marshall", image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
                { name: "Sandra Day O'Connor", image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" },
                { name: "John G. Roberts, Jr.", image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
                { name: "Antonin Scalia", image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            ],
            "results": "RBG further diverged, but the rest clustered towards each other"
        },
        "4": {
            "header": "Case 4: Imprison social media 'pranksters'",
            "description": "For the good of society",
            "left": [
                { name: "Ruth Bader Ginsburg", image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
                { name: "Thurgood Marshall", image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
            ],
            "right": [
                { name: "Sandra Day O'Connor", image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" },
                { name: "John G. Roberts, Jr.", image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
                { name: "Antonin Scalia", image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            ],
            "results": "Both voting groups coalesced together, note not all shifts are equal"
        }
    };

    // Ensure valid index and fallback to empty data
    $: caseData = casesDict[index] || {
        header: "No case data available",
        description: "",
        left: [],
        right: [],
        center: [],
        results: ""
    };
</script>

<section class="case-container">
    <p class="header">{caseData.header}</p>
    <p>{caseData.description}</p>

    <Votes caseData={caseData} />

    <p>{caseData.results}</p>
</section>

<style>

    p {
        text-align: center;
    }

    .header {
        font-weight: bold;
        text-align: center;
    }

</style>
