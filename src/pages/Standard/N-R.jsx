import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { evaluate, derivative} from 'mathjs';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function IterationTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Iteration</TableCell>
            <TableCell align="center">x</TableCell>
            <TableCell align="center">fx</TableCell>

            <TableCell align="center">Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.x}</TableCell>
              <TableCell align="center">{row.fx}</TableCell>
              <TableCell align="center">{row.error}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const NewtonRaphson = () => {
  const [equation, setEquation] = useState("");
  const [initialGuess, setInitialGuess] = useState(0);
  const [tolerance, setTolerance] = useState(0);
  const [maxIterations, setMaxIterations] = useState(0);
  const [results, setResults] = useState([]);

  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);

  function handleToggleTable() {
    setShowTable(!showTable);
  }

  function handleToggleChart() {
    setShowChart(!showChart);
  }

  const calculateRoot = () => {
    const f = (x) => evaluate(equation, {x: x});
    let x = initialGuess;
    let i = 1;
    let fx = f(x);
    let error = tolerance + 1;
    let data = [];

    while (fx !== 0 && error > tolerance && i <= maxIterations) {
      const fDash = derivative(equation, 'x');
      const fxDash = fDash.evaluate({x: x});
      const xn = x - (fx / fxDash);
      error = Math.abs((xn - x) / xn);
      x = xn;
      fx = f(x);
      i++;
      data.push({
        iteration: i,
        x: x,
        fx: fx,
        error: error
      });
    }

    setResults(data);
  }

  return (
    <div>
      <TextField
        label="equation"
        variant="outlined"
        margin="normal"
        value={equation}
        onChange={(e) => setEquation(e.target.value)}
      />
      <TextField
        label="Initial Guess (x0)"
        variant="outlined"
        margin="normal"
        value={initialGuess}
        onChange={(e) => setInitialGuess(e.target.value)}
      />
      <TextField
        label="Tolerance"
        variant="outlined"
        margin="normal"
        value={tolerance}
        onChange={(e) => setTolerance(e.target.value)}
      />
      <TextField
        label="Maximum Iterations"
        variant="outlined"
        margin="normal"
        value={maxIterations}
        onChange={(e) => setMaxIterations(e.target.value)}
      />
      <br />
      <Button variant="contained" onClick={calculateRoot}>Calculate</Button>
      <br />
      <br />
      <div>
        {/* Form component */}
        {/* Results component */}
        {results.length > 0 && (
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
        {showTable && <IterationTable data={results} />}
      </div>
    </div>
  );
};

export default NewtonRaphson;
