document.getElementById("predictForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
        age: parseInt(document.getElementById("age").value),
        "body_temperature(f)": parseFloat(document.getElementById("temperature").value),
        "heart_rate(bpm)": parseInt(document.getElementById("heartRate").value),
        "systolic_blood_pressure(mm_hg)": parseInt(document.getElementById("systolicBP").value),
        "diastolic_blood_pressure(mm_hg)": parseInt(document.getElementById("diastolicBP").value),
        "bmi(kg/m_2)": parseFloat(document.getElementById("bmi").value),
        "blood_glucose(hba1c)": parseFloat(document.getElementById("hba1c").value),
        "blood_glucose(fasting_hour-mg/dl)": parseFloat(document.getElementById("fastingGlucose").value)
    };

    console.log("📤 Sending Data:", JSON.stringify(data));  // Debug log

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("✅ Prediction Result:", result);

        if (response.ok) {
            document.getElementById("predictionResult").innerText = `Risk Level: ${result["Predicted Risk Level"]}`;
        } else {
            document.getElementById("predictionResult").innerText = `❌ Error: ${result.error}`;
        }
    } catch (error) {
        console.error("❌ API Error:", error);
        document.getElementById("predictionResult").innerText = `❌ API Error: ${error.message}`;
    }
});
