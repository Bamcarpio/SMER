import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css"; // Import CSS file for styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Fetch full name from Firebase Realtime Database
        const userRef = ref(db, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          setFullName(snapshot.val().fullName);
        }
      } else {
        navigate("/"); // Redirect to login if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to login after logout
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <>
          

          {/* Welcome Section */}
          <div className="dashboard-content">
            <div className="welcome-box">
              <img src="./assets/avatar.png" alt="User Avatar" className="user-avatar" />
              <h1>Welcome, {fullName}!</h1>
              <p>Select a section from the navigation bar.</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
