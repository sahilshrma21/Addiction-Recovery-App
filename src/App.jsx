import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Login from "./components/Login";
import Register from "./components/Register";
import Services from "./components/Services";
import Team from "./components/Team";
import "./index.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <>
            <Header />
            <HeroSection />
            <About />
            <Services />
            <Team />
            <Contact />
          </>
        }
      />
    </Routes>
    // <About/>
    // <Contact/>
    // <Dairy/>
  );
}

export default App;
