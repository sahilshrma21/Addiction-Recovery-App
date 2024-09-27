import React from "react";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Team from "./components/Team";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
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
  );
}

export default App;
