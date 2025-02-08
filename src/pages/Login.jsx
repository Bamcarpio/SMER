import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/logo.png"; // Same logo

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard"); // Redirect if already logged in
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = `${username}@kennethgads.com`;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to Dashboard
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      
      <form onSubmit={handleLogin} className="auth-form">
        <img src={logo} alt="Logo" className="logo" /> {/* Logo above Register text */}
        <h2>Login</h2>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>Don't have an account?</p>
        <button type="button" className="secondary-btn" onClick={() => navigate("/register")}>Register</button>
      </form>
    </div>
  );
};

export default Login;
