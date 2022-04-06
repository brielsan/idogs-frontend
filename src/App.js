import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing.jsx";
import Home from "./pages/Home/Home.jsx";
import CreateRace from "./pages/CreateRace/CreateRace.jsx";
import DogDetail from "./pages/DogDetail/DogDetail.jsx";
import NotFound from "./pages/404/404";

function App() {
    useEffect(() => {
    localStorage.clear();
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createrace" element={<CreateRace />} />
          <Route path="/dog/:name" element={<DogDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
