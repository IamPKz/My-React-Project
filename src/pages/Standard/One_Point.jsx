import React, { useState } from "react";

import { evaluate } from "mathjs";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

function IterationChart({ data }) {
  const chartData = {
    labels: data.map((row, index) => `${index + 1}`),
    datasets: [
      {
        label: "x",
        data: data.map((row) => row.x),
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
            text: "Fixed-Point Iteration Chart",
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
            <TableCell align="center">x</TableCell>
            <TableCell align="center">f(x)</TableCell>
            <TableCell align="center">g(x)</TableCell>
            <TableCell align="center">Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.x}</TableCell>
              <TableCell align="center">{row.fx}</TableCell>
              <TableCell align="center">{row.gx}</TableCell>
              <TableCell align="center">{row.error}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function FixedPointIterationCalculator() {
  const [func, setFunc] = useState("(1/2)*(25/x+x)");
  const [initialValue, setInitialValue] = useState(2);
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
    let gx = initialValue;
    let x = 0;
    let error = Number.MAX_VALUE;
    const newData = [];

    // Perform the fixed-point iteration method
    do {
      x = gx;
      gx = evaluate(func, { x: x });

      error = Math.abs((gx - x)/gx)*100;
      i++;

      newData.push({ x, gx, fx: evaluate(func, { x: x }), error });
    }while (i < maxIterations && error > tolerance)

    setData(newData);
    setShowTable(data.length > 0);
  }

  return (
    <div>
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Fixed-Point Iteration Calculator
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Function"
              required
              value={func}
              onChange={(e) => setFunc(e.target.value)}
            />
            <TextField
              label="Initial Value"
              required
              type="number"
              value={initialValue}
              onChange={(e) => setInitialValue(e.target.value)}
            />
            <TextField
              label="Tolerance"
              required
              type="number"
              value={tolerance}
              onChange={(e) => setTolerance(e.target.value)}
            />
            <TextField
              label="Max Iterations"
              required
              type="number"
              value={maxIterations}
              onChange={(e) => setMaxIterations(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Calculate
            </Button>
          </Box>
        </form>
      </Box>
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

export default FixedPointIterationCalculator;
