import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# Load the dataset
df = pd.read_csv("maternal_health_data.csv")  # Update with your actual dataset file

# Encode categorical variables
label_encoders = {}
categorical_columns = ["Sugar", "VDRL", "HBsAG", "Risky pregnancy"]

for col in categorical_columns:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Select features and target
X = df.drop(columns=["Risky pregnancy"])  # Features
y = df["Risky pregnancy"]  # Target variable

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model and encoders
joblib.dump(model, "maternal_health_model.pkl")
joblib.dump(label_encoders, "label_encoders.pkl")

print("Model training complete and saved!")
