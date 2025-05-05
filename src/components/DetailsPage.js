import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import partsData from "../data/partsData.json";
import { Pie, Bar } from "react-chartjs-2";
import Donut3DChart from "./Donut3DChart";

function DetailsPage() {
  const location = useLocation();
  const { partNumber, quantity } = location.state || {};
  const [manufacturers, setManufacturers] = useState([]);
  const [totalHighest, setTotalHighest] = useState(0);
  const [totalLowest, setTotalLowest] = useState(0);

  useEffect(() => {
    if (!partNumber) return;
    
    // Find the part from partsData.json
    const part = partsData.components.find((p) => p["Part Number"] === partNumber);

    const sortedManufacturers = part.manufacturers.sort(
        (a, b) => a["Carbon emission KgCO2e"] - b["Carbon emission KgCO2e"]
      );
    const lowest = sortedManufacturers[0]["Carbon emission KgCO2e"] * quantity;
    const highest = sortedManufacturers[sortedManufacturers.length - 1]["Carbon emission KgCO2e"] * quantity;
    if (part) {
      setManufacturers(sortedManufacturers);
      setTotalHighest(highest);
      setTotalLowest(lowest);
    }
  }, [partNumber]);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-xl rounded-3xl">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
          Carbon Emissions for all manufacturers
        </h1>
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Part Number : {partNumber} Quantity : {quantity}
        </h2>

        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-blue-300">
              <th className="p-3 border border-gray-400">Manufacturer</th>
              <th className="p-3 border border-gray-400">MPN</th>
              <th className="p-3 border border-gray-400">Carbon Emission per unit (KgCO2e)</th>
              <th className="p-3 border border-gray-400">Total Carbon Emission</th>
            </tr>
          </thead>
          <tbody>
            {manufacturers.map((manu, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="p-3 border border-gray-400">{manu["Manufacturer name"]}</td>
                <td className="p-3 border border-gray-400">{manu.MPN}</td>
                <td className="p-3 border border-gray-400">{manu["Carbon emission KgCO2e"]}</td>
                <td className="p-3 border border-gray-400">{(manu["Carbon emission KgCO2e"] * quantity).toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 text-lg font-semibold text-center text-gray-700 bg-gray-200 p-4 rounded-lg shadow">
  <div className="text-left mx-auto w-max">
    <p className="whitespace-pre">Total Highest Emission:           {totalHighest.toFixed(6)} KgCO2e</p>
    <p className="whitespace-pre">Total Lowest Emission:            {totalLowest.toFixed(6)} KgCO2e</p>
    <p className="whitespace-pre">Total Carbon Saved:                 {(totalHighest - totalLowest).toFixed(6)} KgCO2e</p>
    <p className="whitespace-pre">Percentage Carbon Saved:      {(((totalHighest - totalLowest) / totalHighest) * 100.0).toFixed(2)}%</p>
  </div>
</div>
      <div className="mt-8 flex justify-around items-center gap-6">
      <div className="w-1/2 bg-white p-3 rounded-lg shadow-lg">
  <div className="flex justify-center items-center">
  <Donut3DChart title = "Total Carbon Saving" labels={['Total Carbon Saved', 'Lowest Emission']} data={[(totalHighest - totalLowest), totalLowest]} />
  </div>
</div>
                    <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-center items-center">
                      <Bar
                        data={{
                          labels: ["Highest Emission", "Lowest Emission"],
                          datasets: [
                            {
                              label: "Carbon Emissions (KgCO2e)",
                              data: [totalHighest, totalLowest],
                              backgroundColor: ["#ff3b3b", "#32a852"],
                              barThickness: 75,
                            },
                          ],
                        }}
                      />
                    </div>
                    </div>
                    </div>
      </div>
      
    </div>
  );
}

export default DetailsPage;
