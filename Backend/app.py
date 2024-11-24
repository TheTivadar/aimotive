from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the speed and imu data
def load_speed_data():
    try:
        df = pd.read_csv("dbw.csv")  # Replace with your CSV filename
        df = df.fillna(-333)  # Replace NaN with None (JSON-compatible)
        return df
    except Exception as e:
        return pd.DataFrame({"error": [str(e)]})  # Return error message in DataFrame

def load_imu_data():
    try:
        df = pd.read_csv("imu.csv")  # Replace with your CSV filename
        df = df.fillna(-333)  # Replace NaN with None (JSON-compatible)
        return df
    except Exception as e:
        return pd.DataFrame({"error": [str(e)]})  # Return error message in DataFrame

@app.route("/api/speed", methods=["GET"])
def get_speed_data():
    """Endpoint to get speed data"""
    df = load_speed_data()
    if "error" in df.columns:  # Check if there was an error in loading the data
        return jsonify({"status": "error", "message": df["error"].iloc[0]}), 500
    return jsonify(df.to_dict(orient="records"))

@app.route("/api/imu", methods=["GET"])
def get_imu_data():
    """Endpoint to get IMU data"""
    df = load_imu_data()
    if "error" in df.columns:  # Check if there was an error in loading the data
        return jsonify({"status": "error", "message": df["error"].iloc[0]}), 500
    return jsonify(df.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
