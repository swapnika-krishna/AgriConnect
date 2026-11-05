
import { Link, useNavigate } from "react-router-dom";
import { Sprout } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <Sprout size={28} />
        AgriConnect
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/crops">Crops</Link>
        <Link to="/weather">Weather</Link>
        <Link to="/market">Market Prices</Link>
        <Link to="/experts">Experts</Link>
      </div>

      <div className="nav-buttons">
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/register" className="register-btn">Join Now</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
