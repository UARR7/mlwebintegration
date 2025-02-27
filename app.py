# from flask import Flask, request, jsonify
# import pickle
# import numpy as np

# app = Flask(__name__)

# # Load the trained model
# with open("model.pkl", "rb") as f:
#     model = pickle.load(f)

# @app.route("/")
# def home():
#     return "ML Model API is Running!"

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
#     features = np.array(data["features"]).reshape(1, -1)
#     prediction = model.predict(features)
#     return jsonify({"prediction": prediction.tolist()})

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5001)

from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow requests from your React frontend

# Load the trained model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

@app.route("/")
def home():
    return "ML Model API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, -1)
        prediction = model.predict(features)
        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400  # Return errors if input is wrong

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)  # Keep it 5000 for Render
