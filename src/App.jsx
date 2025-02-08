import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"; // Import the Layout component
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard"; // Import Dashboard
import Products from "./pages/Products";
import Received from "./pages/Received";
import InventorySales from "./pages/InventorySales";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout and Protected Routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add the Dashboard route */}
        <Route path="/products" element={<Products />} />
        <Route path="/received" element={<Received />} />
        <Route path="/inventory-sales" element={<InventorySales />} />
      </Route>
    </Routes>
  );
}

export default App;
