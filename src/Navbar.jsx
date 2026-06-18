import { Link } from "react-router-dom";

function Navbar({ theme, setTheme }) {
  return (
    <nav className="navbar">
      <div className="logo">🏎 F1 Dashboard</div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/drivers">Drivers</Link>
        <Link to="/teams">Teams</Link>
        <Link to="/races">Races</Link>
        <Link to="/standings">Standings</Link>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;