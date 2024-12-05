<script>

    import DemoTip from "$components/demo/Demo.Tip.svelte";
    
    </script>
    
    <h3>
        What is an MQ Score?
    </h3>
    
    <p>
        Martin-Quinn (MQ) score is a dynamic measure of the ideology of U.S. Supreme Court Justices based on their voting patterns. The method monitors which justices vote together consistently and which justices vote differently consistently to establish opposing ideologies. Justices that vary more with who, of the other justices, they vote with would trend towards the ideological center. The measurement is based on Markov chain Monte Carlo methods and can predict the patterns of justice voting with 75% accuracy.
    </p>

    <p>
        MQ scores are solely based on justice voting patterns and no characterization of the politics or ideology of cases is used by the model. By not using characterizations of the cases the method is more robust in terms of not relying on qualitative measures, but may lose fidelity by not distinguishing pivotal case decisions. Additionally, the authors label the opposing ideological poles “liberal” and “conservative” based on how well they align with known ideologies of justices but the ideological poles the model outputs may be a more nuanced description of justice voting behavior.
    </p>
    
    <style>
        p {
            color: black;
            text-align: left;
    
            padding-left: 10%;
            padding-right: 10%;
        }    

    </style>