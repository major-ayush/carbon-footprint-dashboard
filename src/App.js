import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, {useState } from "react";
import HomePage from "./components/HomePage";
import SummaryPage from "./components/SummaryPage";
import DetailsPage from "./components/DetailsPage";

function App() {
  const [parts, setParts] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage setParts={setParts} />} />
        <Route path="/summary" element={<SummaryPage parts={parts} />} />
        <Route path="/details" element={<DetailsPage parts={parts} />} />
      </Routes>
    </Router>
  );
}

export default App;
