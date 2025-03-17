import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        {/* Route for the Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Route for the Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Default Route (Redirect to Login) */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;