import { React, useState} from "react";
import "./App.css";


import {
  Box,
} from "@mui/material";
import { BrowserRouter} from "react-router-dom";

import Navbar from "./Components/Navbar";
import Bisection from "./pages/Standard/Bisection";

function App() {

  return (
      <BrowserRouter>
        <Box component="nav" sx={{paddingBottom:5}}>
          <Navbar/>
        </Box>
        <Box>
          <Bisection/>
        </Box>
      </BrowserRouter>
  );
}

export default App;
