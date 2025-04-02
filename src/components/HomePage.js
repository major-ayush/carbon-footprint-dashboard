import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ setParts }) {
  const [entries, setEntries] = useState([{ partNumber: "", quantity: "" }]); // Empty quantity initially
  const navigate = useNavigate();

  const handleChange = (index, field, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index][field] = value;
    setEntries(updatedEntries);
  };

  const addEntry = () => {
    setEntries([...entries, { partNumber: "", quantity: "" }]); // Add empty quantity for new part
  };

  const removeEntry = (index) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    const validEntries = entries.filter(entry => entry.partNumber.trim() !== "");
    if (validEntries.length === 0) {
      alert("Please enter at least one part number.");
      return;
    }
    setParts(validEntries);
    navigate("/summary", { state: { parts: validEntries } });  // Navigate to summary page after submission
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-200 to-lime-100 p-8">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-3xl border border-gray-300">
        <h1 className="text-5xl font-extrabold text-center text-green-700 mb-3">Carbon Footprint Calculator</h1>
        <p className="text-lg text-center text-gray-700 mb-8">Enter part details to assess environmental impact.</p>
        {entries.map((entry, index) => (
          <div key={index} className="flex items-center gap-4 mb-4 animate-fadeIn">
            <input
              type="text"
              placeholder="Enter Part Number"
              value={entry.partNumber}
              onChange={(e) => handleChange(index, "partNumber", e.target.value)}
              className="p-4 border rounded-lg w-full shadow-md focus:ring-2 focus:ring-green-400 outline-none text-gray-900"
            />
            <div className="relative w-32">
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={entry.quantity}
                onChange={(e) => handleChange(index, "quantity", parseInt(e.target.value))}
                className="p-4 border rounded-lg w-full shadow-md focus:ring-2 focus:ring-green-400 outline-none text-gray-900 text-center"
              />
              
            </div>
            <button 
              onClick={() => removeEntry(index)} 
              className="bg-red-400 text-white px-3 py-2 rounded-md shadow-md hover:bg-red-500 transition-transform transform hover:scale-105 flex items-center justify-center text-lg h-8 w-8"
            >
              ✖
            </button>
          </div>
        ))}
        <button 
          onClick={addEntry} 
          className="w-full bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 font-semibold"
        >
          ➕ Add Another Part
        </button>
        <br />
        <button 
          onClick={handleSubmit} 
          className="w-full bg-teal-500 text-white px-6 py-4 mt-5 rounded-lg shadow-lg hover:bg-teal-600 transition-transform transform hover:scale-105 font-semibold"
        >
          🌱 Calculate and Compare Carbon Footprint
        </button>
      </div>
    </div>
  );
}

export default HomePage;
