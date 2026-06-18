import { useEffect, useState } from "react";

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/constructorStandings")
      .then((res) => res.json())
      .then((data) => {
        const list =
          data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings;
        setTeams(list || []);
      });
  }, []);

  return (
    <div className="page">
      <h1>🏎 Teams Championship</h1>

      <div className="grid">
        {teams.map((t) => (
          <div className="card" key={t.Constructor.constructorId}>
            <h2>{t.position}. {t.Constructor.name}</h2>
            <p>🏆 {t.points} pts</p>
            <p>📊 Wins: {t.wins}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;