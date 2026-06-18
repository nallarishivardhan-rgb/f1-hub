import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

/* Team colors */
const teamColors = {
  "Red Bull": "#3671C6",
  Ferrari: "#E10600",
  Mercedes: "#00D2BE",
  McLaren: "#FF8700",
  "Aston Martin": "#006F62",
  Alpine: "#0090FF",
  Williams: "#005AFF",
  "RB F1 Team": "#6692FF",
  Sauber: "#52E252",
  Haas: "#B6BABD"
};

/* Country flags */
const countryFlags = {
  Netherlands: "🇳🇱",
  "United Kingdom": "🇬🇧",
  Spain: "🇪🇸",
  Monaco: "🇲🇨",
  France: "🇫🇷",
  Germany: "🇩🇪",
  Australia: "🇦🇺",
  Finland: "🇫🇮",
  Japan: "🇯🇵",
  Denmark: "🇩🇰",
  Canada: "🇨🇦",
  Mexico: "🇲🇽",
  Brazil: "🇧🇷",
  USA: "🇺🇸"
};

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");

  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favDrivers")) || [];
  });

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current/driverStandings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        const list =
          data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;

        setDrivers(list || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("favDrivers", JSON.stringify(updated));
  };

  const getImage = (familyName) =>
    `https://media.formula1.com/content/dam/fom-website/drivers/2024Drivers/${familyName.toLowerCase()}.jpg`;

  const filteredDrivers = drivers.filter((d) => {
    const name = `${d.Driver.givenName} ${d.Driver.familyName}`.toLowerCase();

    const matchSearch = name.includes(search.toLowerCase());
    const matchTeam =
      teamFilter === "All" || d.Constructors[0].name === teamFilter;

    return matchSearch && matchTeam;
  });

  const teams = [
    "All",
    ...new Set(drivers.map((d) => d.Constructors[0].name))
  ];

  const chartData = drivers.slice(0, 10).map((d) => ({
    name: d.Driver.familyName,
    points: Number(d.points)
  }));

  if (loading) {
    return (
      <div className="page">
        <h2>🏎️ Loading Drivers...</h2>

        <div className="grid">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="card">
                <div className="skeleton" style={{ height: "170px" }} />
                <div className="skeleton" style={{ height: "20px", marginTop: 10 }} />
                <div className="skeleton" style={{ height: "20px", marginTop: 10 }} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2 style={{ color: "red" }}>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>🏁 F1 Drivers</h1>

      {/* CHART */}
      <div style={{ width: "100%", height: 250, marginBottom: 30 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="points" fill="#e10600" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* SEARCH + FILTER */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search driver..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
        >
          {teams.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="grid">
        {filteredDrivers.map((d) => {
          const team = d.Constructors[0].name;
          const color = teamColors[team] || "#fff";
          const flag = countryFlags[d.Driver.nationality] || "🏳️";
          const isFav = favorites.includes(d.Driver.driverId);

          return (
            <div
              key={d.Driver.driverId}
              className="card driver-card"
              style={{ borderLeft: `6px solid ${color}` }}
            >
              {/* IMAGE */}
              <div className="driver-img">
                <img
                  src={getImage(d.Driver.familyName)}
                  alt={d.Driver.familyName}
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>

              {/* TOP */}
              <div className="card-top">
                <h2>
                  <span className="rank">#{d.position}</span>{" "}
                  {d.Driver.givenName} {d.Driver.familyName}
                </h2>

                <span className="points">{d.points} pts</span>
              </div>

              {/* INFO */}
              <div className="card-bottom">
                <p>🏎 {team}</p>
                <p>
                  {flag} {d.Driver.nationality}
                </p>
              </div>

              {/* FAVORITE */}
              <button
                className="fav-btn"
                onClick={() => toggleFavorite(d.Driver.driverId)}
              >
                {isFav ? "❤️ Favorited" : "🤍 Add Favorite"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Drivers;