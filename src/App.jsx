import { React, useState } from "react";
import "./App.css";

import { Box } from "@mui/material";
import { BrowserRouter , Routes , Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Bisection from "./pages/Standard/Bisection";
import False_Position from "./pages/Standard/False-Position";
import One_Point from "./pages/Standard/One_Point";

function App() {
  return (
    <BrowserRouter>
      <Box component="nav" sx={{ paddingBottom: 5 }}>
        <Navbar />
      </Box>
      <Box>
        <Routes>
          <Route path="/" element={<Bisection/>}></Route>
          <Route path="/Bisection" element={<Bisection />}></Route>
          <Route path="/False_Position" element={<False_Position/>}></Route>
          <Route path="/One_Point" element={<One_Point/>}></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
