import { React } from "react";

import { Box } from "@mui/material";
import { BrowserRouter , Routes , Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import BisectionMethodCalculator from "./pages/Standard/Bisection";
import FalsePositionMethodCalculator from "./pages/Standard/False_position";
import FixedPointIterationCalculator from "./pages/Standard/One_point";
import Taylor_seriesCalculator from "./pages/Standard/Taylor_series";
import NewtonRaphson from "./pages/Standard/N-R";
import SecantMethod from "./pages/Standard/Secant";

import CramerRule from "./pages/Solution_Tech/carmer";
function App() {
  return (
    <BrowserRouter>
      <Box component="nav" sx={{ paddingBottom: 5 }}>
        <Navbar />
      </Box>
      <Box>
        <Routes>
          <Route path="/" element={<BisectionMethodCalculator/>}></Route>
          <Route path="/Bisection" element={<BisectionMethodCalculator />}></Route>
          <Route path="/False_Position" element={<FalsePositionMethodCalculator />}></Route>
          <Route path="/One_Point" element={<FixedPointIterationCalculator />}></Route>
          <Route path="/Taylor" element={<Taylor_seriesCalculator />}></Route>
          <Route path="/Newton" element={<NewtonRaphson />}></Route>
          <Route path="/Secant" element={<SecantMethod />}></Route>

          <Route path="/Cramer" element={<CramerRule />}></Route>

        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
