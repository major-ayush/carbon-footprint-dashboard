import { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import partsData from "../data/partsData.json";
import Donut3DChart from "./Donut3DChart";
import PieChart from "./PieChart";
import CarbonEmissionsChart from "./BarChart";


ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function SummaryPage() {
  const location = useLocation();
  
  const selectedParts = useMemo(() => location.state?.parts || [], [location.state]);
  const annualQuantity = useMemo(() => location.state?.annualQuantity || [], [location.state]);
  const [filteredParts, setFilteredParts] = useState([]);
  const [totalHighest, setTotalHighest] = useState(0);
  const [totalLowest, setTotalLowest] = useState(0);
  const [annualHighest, setAnnualHighest] = useState(0);
  const [annuallowest, setAnnualLowest] = useState(0);
  const [missingParts, setMissingParts] = useState([]);

  useEffect(() => {
    if (selectedParts.length === 0) return;

    let highestTotal = 0;
    let lowestTotal = 0;
    const filtered = [];
    const missing = [];

    selectedParts.forEach(({ partNumber, quantity }) => {
      const part = partsData.components.find((p) => p["Part Number"] === partNumber);
      if (part) {
        const sortedManufacturers = [...part.manufacturers].sort(
          (a, b) => a["Carbon emission KgCO2e"] - b["Carbon emission KgCO2e"]
        );
        const lowest = sortedManufacturers[0];
        const highest = sortedManufacturers[sortedManufacturers.length - 1];

        const lowestEmission = lowest["Carbon emission KgCO2e"] * quantity;
        const highestEmission = highest["Carbon emission KgCO2e"] * quantity;
        const percentageSave = ((highestEmission - lowestEmission) / highestEmission) * 100;

        filtered.push(
          { partNumber, quantity, ...lowest, totalEmission: lowestEmission, isLowest: true, percentageSave },
          { partNumber, quantity, ...highest, totalEmission: highestEmission, isLowest: false, percentageSave }
        );

        lowestTotal += lowestEmission;
        highestTotal += highestEmission;
      } else {
        missing.push(partNumber);
      }
    });

    if (missing.length > 0) {
      setMissingParts(missing);
    } else {
      setFilteredParts(filtered);
      setTotalLowest(lowestTotal);
      setTotalHighest(highestTotal);
      setAnnualHighest((highestTotal * annualQuantity));
      setAnnualLowest((lowestTotal * annualQuantity));
    }
  }, [selectedParts]);
  const navigate = useNavigate();
  const handlePartClick = (partNumber, quantity) => {
    navigate("/details", { state: { partNumber, quantity } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white p-8 shadow-xl rounded-3xl">
        <h1 className="text-4xl font-semibold text-center text-blue-800 mb-8">Carbon Footprint Summary</h1>

        {missingParts.length > 0 ? (
          <div className="text-red-500 text-center p-4 mb-6 font-medium text-lg">
            <strong>Warning:</strong> The following part numbers are missing: {missingParts.join(", ")}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="w-full border border-gray-300 text-left rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-4 border border-gray-400">Part Number</th>
                    <th className="p-4 border border-gray-400">Quantity</th>
                    <th className="p-4 border border-gray-400">MPN</th>
                    <th className="p-4 border border-gray-400">Manufacturer</th>
                    <th className="p-4 border border-gray-400">Carbon Emission (KgCO2e)</th>
                    <th className="p-4 border border-gray-400">Total Carbon Emission</th>
                    <th className="p-4 border border-gray-400">Carbon Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParts.map((part, index) => (
                    <tr
                      key={index}
                      className={`border border-gray-300 ${part.isLowest ? "bg-green-100" : "bg-red-100"}`}
                    >
                      {index % 2 === 0 ? (
                        <>
                        <td rowSpan="2" className="p-3 border border-gray-400 cursor-pointer text-blue-600 underline" onClick={() => handlePartClick(part.partNumber, part.quantity)}>
                          {part.partNumber}
                        </td>
                          <td rowSpan="2" className="p-4 border border-gray-400 font-medium">{part.quantity}</td>
                        </>
                      ) : null}
                      <td className="p-4 border border-gray-400">{part.MPN}</td>
                      <td className="p-4 border border-gray-400">{part["Manufacturer name"]}</td>
                      <td className="p-4 border border-gray-400">{part["Carbon emission KgCO2e"]}</td>
                      <td className="p-4 border border-gray-400">{part.totalEmission.toFixed(6)}</td>
                      {index % 2 === 0 ? (
                        <td rowSpan="2" className="p-4 border border-gray-400 font-medium text-blue-700">
                          {part.percentageSave.toFixed(2)}%
                        </td>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-lg font-semibold text-center text-gray-700 bg-gray-200 p-4 rounded-lg shadow">
  <div className="text-left mx-auto w-max">
    <p className="whitespace-pre">Total Annual Highest Emission:     {annualHighest.toFixed(6)} KgCO2e</p>
    <p className="whitespace-pre">Total Annual Lowest Emission:      {annuallowest.toFixed(6)} KgCO2e</p>
    <p className="whitespace-pre">Total Annual Carbon Saved:           {(annualHighest - annuallowest).toFixed(6)} KgCO2e</p>
    <p className="whitespace-pre">Percentage Carbon Saved:             {(((totalHighest - totalLowest) / totalHighest) * 100.0).toFixed(2)}%</p>
  </div>
</div>

            <div className="mt-8 flex justify-around items-center gap-6">
            <div className="w-1/2 bg-white p-3 rounded-lg shadow-lg">
  <div className="flex justify-center items-center">
    {/* <Donut3DChart title = "Annual Carbon Savings" labels={['Total Annual Carbon Saved', 'Total Annual Lowest Emission']} data={[(annualHighest - annuallowest), annuallowest]} /> */}
    <PieChart
  highestEmission={parseFloat(annualHighest.toFixed(6))}
  lowestEmission={parseFloat(annuallowest.toFixed(6))}
  savings={parseFloat(annualHighest.toFixed(6)) - parseFloat(annuallowest.toFixed(6))}
/>

  </div>
</div>
              <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex justify-center items-center">
                <CarbonEmissionsChart
                  highestEmission={parseFloat(annualHighest.toFixed(6))}
                  lowestEmission={parseFloat(annuallowest.toFixed(6))}
                />
              </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SummaryPage;