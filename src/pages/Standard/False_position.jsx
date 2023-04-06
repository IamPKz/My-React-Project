import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { evaluate } from "mathjs";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function IterationChart({ data }) {
  const chartData = {
    labels: data.map((row, index) => `${index + 1}`),
    datasets: [
      {
        label: "xm",
        data: data.map((row) => row.xm),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        scales: {
          y: {
            type: "linear",
            title: {
              display: true,
              text: "xm",
            },
          },
          x: {
            type: "category",
            title: {
              display: true,
              text: "Iteration",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Bisection Method Iteration Chart",
            font: {
              size: 20,
            },
          },
        },
      }}
    />
  );
}

function IterationTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Iteration</TableCell>
            <TableCell align="center">xl</TableCell>
            <TableCell align="center">xr</TableCell>
            <TableCell align="center">xm</TableCell>
            <TableCell align="center">Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.xl}</TableCell>
              <TableCell align="center">{row.xr}</TableCell>
              <TableCell align="center">{row.xm}</TableCell>
              <TableCell align="center">{row.error}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function FalsePositionMethodCalculator() {
  const [func, setFunc] = useState("x^3 - x - 1");
  const [xl, setXl] = useState(1);
  const [xr, setXr] = useState(2);
  const [tolerance, setTolerance] = useState(0.0001);
  const [maxIterations, setMaxIterations] = useState(20);
  const [data, setData] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);

  function handleToggleTable() {
    setShowTable(!showTable);
  }

  function handleToggleChart() {
    setShowChart(!showChart);
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    // Define the function to evaluate
  
    // Initialize the variables
    let i = 0;
    let xm = 0;
    let error = Number.MAX_VALUE;
    let fxl = evaluate(func, { x: xl });
    let fxr = evaluate(func, { x: xr });
  
    let xlVal = xl;
    let xrVal = xr;
  
    // Check if the function has opposite signs at the bounds
    if (fxl * fxr >= 0) {
      window.alert("Error: f(xl) and f(xr) must have opposite signs.");
      return;
    }
  
    const newData = [];
  
    // Perform the false position method
    while (i < maxIterations && error > tolerance) {
      xm = xrVal - ((fxr * (xrVal - xlVal)) / (fxr - fxl));
      const fxm = evaluate(func, { x: xm });
      if (fxm === 0) {
        break;
      } else if (fxm * fxl < 0) {
        xrVal = xm;
        fxr = fxm;
      } else {
        xlVal = xm;
        fxl = fxm;
      }
      error = Math.abs(xrVal - xlVal);
      i++;
  
      newData.push({ xl, xr, xm, fx: fxm, error });
    }
  
    setData(newData);
    setShowTable(data.length > 0);
    setShowChart(data.length > 0);
  }

  return (
    <div>
      <h2>FalsePosition Method Calculator</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Function"
          value={func}
          onChange={(e) => setFunc(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Lower bound (xl)"
          type="number"
          value={xl}
          onChange={(e) => setXl(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Upper bound (xr)"
          type="number"
          value={xr}
          onChange={(e) => setXr(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tolerance"
          type="number"
          value={tolerance}
          onChange={(e) => setTolerance(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Max iterations"
          type="number"
          value={maxIterations}
          onChange={(e) => setMaxIterations(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Calculate
        </Button>
      </form>
      <div>
        {/* Form component */}
        {/* Results component */}
        {data.length > 0 && (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleToggleTable}
            >
              {showTable ? "Hide Table" : "Show Table"}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleToggleChart}
            >
              {showChart ? "Hide Chart" : "Show Chart"}
            </Button>
          </div>
        )}
        {showTable && <IterationTable data={data} />}
        {showChart && <IterationChart data={data} />}
      </div>
    </div>
  );
}

export default FalsePositionMethodCalculator;
