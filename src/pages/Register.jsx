import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.png"; // Same logo


const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard"); // Redirect if already logged in
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = `${username}@kennethgads.com`;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user details to Firebase Realtime Database
      await set(ref(db, "users/" + user.uid), {
        fullName,
        username,
      });

      alert("Registration successful!");
      navigate("/dashboard"); // Redirect to dashboard after registration
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <img src={logo} alt="Logo" className="logo" /> {/* Logo above Register text */}
        <h2>Register</h2>
        <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} required />
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <p>Email will be: {username ? `${username}@kennethgads.com` : "your_username@kennethgads.com"}</p>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        <button type="button" className="secondary-btn" onClick={() => navigate("/")}>Back to Login</button>
      </form>
    </div>
  );
};

export default Register;
