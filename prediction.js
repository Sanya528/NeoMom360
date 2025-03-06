async function predictRisk() {
    let inputData = {
        Age: parseInt(document.getElementById("age").value),
        Gestation: parseInt(document.getElementById("gestation").value),
        Weight: parseFloat(document.getElementById("weight").value),
        Height: parseFloat(document.getElementById("height").value),
        SystolicBP: parseInt(document.getElementById("systolicBP").value),
        DiastolicBP: parseInt(document.getElementById("diastolicBP").value),
        GestationalDiabetes: parseInt(document.getElementById("gestationalDiabetes").value),
        Anemia: parseInt(document.getElementById("anemia").value),
        Jaundice: parseInt(document.getElementById("jaundice").value),
        BabyHeartRate: parseInt(document.getElementById("babyHeartRate").value),
        UrineTest: parseInt(document.getElementById("urineTest").value),
        InfectionRisk: parseInt(document.getElementById("infectionRisk").value)
    };

    try {
        let response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(inputData)
        });

        let result = await response.json();
        document.getElementById("result").innerText = `Predicted Risk: ${result.risk}`;
    } catch (error) {
        console.error("Error fetching prediction:", error);
        document.getElementById("result").innerText = "Error getting prediction.";
    }
}
