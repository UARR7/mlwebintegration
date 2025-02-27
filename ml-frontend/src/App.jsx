import { useState } from "react";

export default function App() {
    const [inputData, setInputData] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputData(e.target.value);
    };

    const getPrediction = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://mlwebintegration.onrender.com/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input: JSON.parse(inputData) }), // Ensure valid JSON
            });

            const data = await response.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error("Error fetching prediction:", error);
            setPrediction("Error getting prediction.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
            <h1 className="text-2xl font-bold mb-4">ML Model Prediction</h1>
            <textarea
                value={inputData}
                onChange={handleChange}
                placeholder='Enter input as JSON array, e.g., [5.1, 3.5, 1.4, 0.2]'
                className="p-2 border rounded w-80 h-20"
            />
            <button
                onClick={getPrediction}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                disabled={loading}
            >
                {loading ? "Loading..." : "Get Prediction"}
            </button>
            {prediction && (
                <div className="mt-4 p-4 bg-white border rounded">
                    <strong>Prediction:</strong> {JSON.stringify(prediction)}
                </div>
            )}
        </div>
    );
}
