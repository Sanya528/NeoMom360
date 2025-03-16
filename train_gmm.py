import numpy as np
import pandas as pd
import pickle
from sklearn.mixture import GaussianMixture
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from scipy.cluster.hierarchy import linkage, fcluster

# Load dataset (Make sure the dataset path is correct)
df = pd.read_csv("data/synthetic_test_data.csv")  

# 🔥 Debug: Print actual column names before processing
print("Original Columns:", df.columns.tolist())

# Normalize column names: Remove spaces and convert to lowercase
df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")

# 🔥 Debug: Print formatted column names
print("Formatted Columns:", df.columns.tolist())

# Define Features (Updated to match cleaned column names)
features = ['age', 'body_temperature(f)', 'heart_rate(bpm)', 'systolic_blood_pressure(mm_hg)',
            'diastolic_blood_pressure(mm_hg)', 'bmi(kg/m_2)', 'blood_glucose(hba1c)', 'blood_glucose(fasting_hour-mg/dl)']

# 🔥 Check for missing columns
missing_features = [col for col in features if col not in df.columns]
if missing_features:
    raise KeyError(f"❌ Missing columns in dataset: {missing_features}")

# Select relevant data & handle missing values
X = df[features].copy()
X.fillna(X.mean(), inplace=True)  # Impute missing values

# Step 1: Normalize Data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 2: Apply Hierarchical Clustering to determine the number of clusters dynamically
linked = linkage(X_scaled, method='ward')
num_clusters = len(set(fcluster(linked, t=2, criterion='maxclust')))  # Auto-determine cluster count

# Step 3: Apply PCA (Reduce Dimensionality)
pca = PCA(n_components=4)  # Keep 4 principal components
X_pca = pca.fit_transform(X_scaled)

# Step 4: Train Gaussian Mixture Model (GMM)
gmm = GaussianMixture(n_components=num_clusters, random_state=42)
gmm.fit(X_pca)

# Step 5: Save the Model, Scaler, and PCA
pickle.dump(gmm, open("model/gmm_model.pkl", "wb"))
pickle.dump(scaler, open("model/scaler.pkl", "wb"))
pickle.dump(pca, open("model/pca.pkl", "wb"))

print(f"✅ Model training complete! Using {num_clusters} clusters.")
