import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";

function HomePage({ setParts }) {
  const [entries, setEntries] = useState([]);
  const [annualQuantity, setAnnualQuantity] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (results) => {
        const parsed = results.data
          .filter(row => row.length === 2)
          .map(([partNumber, quantity]) => ({
            partNumber: partNumber.trim(),
            quantity: parseInt(quantity.trim(), 10)
          }))
          .filter(entry => entry.partNumber && !isNaN(entry.quantity));

        if (parsed.length > 0) {
          setEntries(parsed);
          setError("");
        } else {
          setError("Invalid CSV format. Please ensure it's: PartNumber,Quantity");
        }
      },
      error: (err) => setError("CSV Parsing Error: " + err.message),
      skipEmptyLines: true
    });
  };

  const handleSubmit = () => {
    const validEntries = entries.filter(
      entry => entry.partNumber.trim() !== "" && !isNaN(entry.quantity)
    );

    if (validEntries.length === 0) {
      alert("No valid data to submit. Please upload a proper CSV.");
      return;
    }

    if (!annualQuantity || isNaN(annualQuantity) || annualQuantity <= 0) {
      alert("Please enter a valid total annual quantity.");
      return;
    }

    setParts(validEntries);
    navigate("/summary", { state: { parts: validEntries, annualQuantity: parseInt(annualQuantity) } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-200 to-lime-100 p-8">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-3xl border border-gray-300">
        <h1 className="text-5xl font-extrabold text-center text-green-700 mb-3">Carbon Footprint Calculator</h1>
        <p className="text-lg text-center text-gray-700 mb-6">Upload a CSV and enter total annual quantity to assess impact.</p>

        {/* CSV Upload */}
        <div className="mb-6 text-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            className="border p-2 rounded-lg shadow-sm"
          />
          <p className="text-sm text-gray-500 mt-2">Format: <code>PartNumber,Quantity</code></p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Annual Quantity Input */}
        <div className="mb-6 text-center">
          <input
            type="number"
            min="1"
            placeholder="Enter Total Annual Quantity"
            value={annualQuantity}
            onChange={(e) => setAnnualQuantity(e.target.value)}
            className="p-4 border rounded-lg w-full max-w-sm shadow-md focus:ring-2 focus:ring-green-400 outline-none text-gray-900 text-center"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={entries.length === 0}
          className="w-full bg-teal-500 text-white px-6 py-4 mt-5 rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🌱 Calculate and Compare Carbon Footprint
        </button>
      </div>
    </div>
  );
}

export default HomePage;
