import { NavLink, Link, useNavigate } from "react-router-dom";
import { Sprout, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  const navClass = ({ isActive }) =>
    isActive ? "active" : "";

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Sprout size={29} strokeWidth={2.5} />
        <span>AgriConnect</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>

        <NavLink to="/crops" className={navClass}>
          Crops
        </NavLink>

        <NavLink to="/weather" className={navClass}>
          Weather
        </NavLink>

        <NavLink to="/market" className={navClass}>
          Market
        </NavLink>

        <NavLink to="/experts" className={navClass}>
          Experts
        </NavLink>
      </div>

      <div className="nav-buttons">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>

            <button
              onClick={handleLogout}
              className="login-btn"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;