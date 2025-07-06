import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";

// Import LocomotiveScroll for smooth scrolling
import LocomotiveScroll from "locomotive-scroll";
// eslint-disable-next-line no-unused-vars
const locomotiveScroll = new LocomotiveScroll({
  smooth: true,
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
