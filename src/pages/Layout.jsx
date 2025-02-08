import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth"; // Import Firebase signOut
import { auth } from "../firebaseConfig"; // Import the Firebase auth instance
import "./Layout.css"; // For navbar styling

const Layout = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="layout-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>
          <Link to="/dashboard" className="logo-link">SMER</Link>
        </h2>
        <ul>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/received">Received</Link></li>
          <li><Link to="/inventory-sales">Inventory/Sales</Link></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Attach logout functionality */}
      </nav>

      {/* Main Content */}
      <div className="content">
        <Outlet /> {/* This is where the page content will be rendered */}
      </div>
    </div>
  );
};

export default Layout;
