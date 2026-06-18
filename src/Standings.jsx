import { useEffect, useState } from "react";

function Standings() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/driverStandings")
      .then((res) => res.json())
      .then((data) => {
        const list =
          data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;
        setDrivers(list || []);
      });
  }, []);

  return (
    <div className="page">
      <h1>🏆 Driver Standings</h1>

      <table className="f1-table">
        <thead>
          <tr>
            <th>Pos</th>
            <th>Driver</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((d) => (
            <tr key={d.Driver.driverId}>
              <td className="pos">{d.position}</td>
              <td>
                {d.Driver.givenName} {d.Driver.familyName}
              </td>
              <td>{d.Constructors[0].name}</td>
              <td className="pts">{d.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Standings;