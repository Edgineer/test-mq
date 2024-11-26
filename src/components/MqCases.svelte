<script>
    import Votes from "$components/Votes.svelte";


    export let index;

    const casesDict = {
        "0": {
            "header": "Initial state",
            "description": "Here we assume a starting point where judges all have an MQ score of zero, and no voting record",
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
            "description": "Another case description",
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
            "header": "Case 2: Should your first tattoo be free?",
            "description": "Another case description",
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
            "description": "Another case description",
            "left": [
                { name: "Ruth Bader Ginsburg", image: "https://api.oyez.org/sites/default/files/images/people/ruth_bader_ginsburg/ruth_bader_ginsburg.thumb.png" },
            ],
            "right": [
                { name: "Thurgood Marshall", image: "https://api.oyez.org/sites/default/files/images/people/thurgood_marshall/thurgood_marshall.thumb.png" },
                { name: "Sandra Day O'Connor", image: "https://api.oyez.org/sites/default/files/images/people/sandra_day_oconnor/sandra_day_oconnor.thumb.png" },
                { name: "John G. Roberts, Jr.", image: "https://api.oyez.org/sites/default/files/images/people/john_g_roberts_jr/john_g_roberts_jr.thumb.png" },
                { name: "Antonin Scalia", image: "https://api.oyez.org/sites/default/files/images/people/antonin_scalia/antonin_scalia.thumb.png" },
            ],
            "results": "RBG continued to pull away, but the other justices moved their MQ score towards each other"
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

    <Votes caseData={caseData} />

    <p>{caseData.results}</p>
</section>

<style>

    .header {
        font-weight: bold;
        text-align: center;
    }

</style>
