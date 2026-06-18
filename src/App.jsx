import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./Navbar";
import Home from "./Home";
import Drivers from "./Drivers";
import Teams from "./Teams";
import Races from "./Races";
import Standings from "./Standings";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/races" element={<Races />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </div>
  );
}

export default App;