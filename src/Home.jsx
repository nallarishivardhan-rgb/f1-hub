import { useEffect, useState } from "react";

function Home() {
  const [nextRace, setNextRace] = useState(null);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/next")
      .then((res) => res.json())
      .then((data) => {
        const race = data?.MRData?.RaceTable?.Races?.[0];
        setNextRace(race);
      });
  }, []);

  return (
    <div className="page">

      {/* HERO */}
      <div className="hero">
        <h1>🏎 Formula 1 Dashboard</h1>
        <p>Live standings, teams, races & real-time stats</p>
      </div>

      {/* QUICK STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🏆 Season</h3>
          <p>2026 Championship</p>
        </div>

        <div className="stat-card">
          <h3>🏁 Races</h3>
          <p>24 Grand Prix</p>
        </div>

        <div className="stat-card">
          <h3>⚡ Status</h3>
          <p>Live Updates</p>
        </div>
      </div>

      {/* NEXT RACE */}
      {nextRace && (
        <div className="next-race">
          <h2>🏁 Next Race</h2>

          <div className="race-card">
            <h3>{nextRace.raceName}</h3>
            <p>📍 {nextRace.Circuit.circuitName}</p>
            <p>🌍 {nextRace.Circuit.Location.country}</p>
            <p>📅 {nextRace.date}</p>

            <div className="countdown-note">
              ⏳ Countdown will be active in Race section
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;