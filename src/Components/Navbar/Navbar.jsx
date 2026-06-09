import React, { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth.service";
import { WishlistContext } from "../../Context/WishlistContext";

const Navbar = () => {
  const { wishlist } = useContext(WishlistContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = async () => {  
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">DealWiser</h2>

      <div className="navigate">
        <Link to="/">Home</Link>
        {
          role=="admin" && <>
          <Link to='/admin/add-product'>Admin</Link>
          </>
        }
        <Link to="/">About</Link>
      </div>

      <div className="nav-actions">

        {user && (
          <Link to="/wishlist" className="cart-btn">
            🛒 Cart ({wishlist.length})
          </Link>
        )}

        {user ? (
          <button className="logout-btn-red" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}

      </div>

    </nav>
  );
};

export default Navbar;