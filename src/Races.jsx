import { useEffect, useState } from "react";

function Races() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current")
      .then((res) => res.json())
      .then((data) => {
        const list = data?.MRData?.RaceTable?.Races;
        setRaces(list || []);
      });
  }, []);

  return (
    <div className="page">
      <h1>🏁 Race Calendar</h1>

      <div className="grid">
        {races.map((r) => (
          <div className="card" key={r.round}>
            <h2>{r.raceName}</h2>
            <p>📍 {r.Circuit.circuitName}</p>
            <p>🌍 {r.Circuit.Location.country}</p>
            <p>📅 {r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Races;