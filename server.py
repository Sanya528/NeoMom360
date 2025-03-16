from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from flask_cors import CORS  # Import CORS to allow frontend requests

# Load trained models
gmm = pickle.load(open("model/gmm_model.pkl", "rb"))
scaler = pickle.load(open("model/scaler.pkl", "rb"))
pca = pickle.load(open("model/pca.pkl", "rb"))

# Define Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Features used in training (match corrected column names)
features = ['age', 'body_temperature(f)', 'heart_rate(bpm)', 'systolic_blood_pressure(mm_hg)',
            'diastolic_blood_pressure(mm_hg)', 'bmi(kg/m_2)', 'blood_glucose(hba1c)', 'blood_glucose(fasting_hour-mg/dl)']

# Risk Level Mapping
risk_mapping = {0: "Low Risk", 1: "Medium Risk", 2: "High Risk"}  # Adjust based on clustering results

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # 🔥 Debug: Print received JSON
        print("Received JSON:", data)

        if not data:
            return jsonify({"error": "No data received or invalid JSON"}), 400

        # Convert to DataFrame
        input_df = pd.DataFrame([data])

        # 🔥 Debug: Print DataFrame structure
        print("Input DataFrame:\n", input_df)

        # Ensure all required features exist
        missing_features = [col for col in features if col not in input_df.columns]
        if missing_features:
            return jsonify({"error": f"Missing features: {missing_features}"}), 400

        # Preprocess and Predict
        X_input = input_df[features]
        X_input.fillna(X_input.mean(), inplace=True)
        X_scaled = scaler.transform(X_input)
        X_pca = pca.transform(X_scaled)
        cluster = gmm.predict(X_pca)[0]
        risk_level = risk_mapping.get(cluster, "Unknown Risk")

        return jsonify({
            "Predicted Cluster": int(cluster),
            "Predicted Risk Level": risk_level
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
