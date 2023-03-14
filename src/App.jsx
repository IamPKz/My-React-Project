import { React, useState} from "react";
import "./App.css";


import {
  Typography,
  Grid,
  Box,
  Drawer,
} from "@mui/material";
import { BrowserRouter, NavLink } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Bisection from "./pages/Standard/Bisection";
import ResponsiveDrawer from "./pages/Standard/Temp";

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
