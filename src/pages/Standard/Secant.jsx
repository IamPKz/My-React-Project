import React, { useState } from 'react';
import { TextField, Button, Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

import { evaluate, derivative} from 'mathjs';

function IterationTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">Iteration</TableCell>
            <TableCell align="center">x0</TableCell>
            <TableCell align="center">x1</TableCell>
            <TableCell align="center">xNext</TableCell>
            <TableCell align="center">Error</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.iteration + 1}</TableCell>
              <TableCell align="center">{row.x0}</TableCell>
              <TableCell align="center">{row.x1}</TableCell>
              <TableCell align="center">{row.xNext}</TableCell>
              <TableCell align="center">{row.error}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function SecantMethod() {
  const [expression, setExpression] = useState('');
  const [initialGuess1, setInitialGuess1] = useState('');
  const [initialGuess2, setInitialGuess2] = useState('');
  const [tolerance, setTolerance] = useState('');
  const [maxIterations, setMaxIterations] = useState('');
  const [tableData, setTableData] = useState([]);

  const [showTable, setShowTable] = useState(false);
  const [showChart, setShowChart] = useState(false);

  function handleToggleTable() {
    setShowTable(!showTable);
  }

  function handleToggleChart() {
    setShowChart(!showChart);
  }

  const handleCalculate = () => {
    // Parse the function
  
    // Initialize variables
    let x0 = parseFloat(initialGuess1);
    let x1 = parseFloat(initialGuess2);
    let iter = parseInt(maxIterations);
    let results = [];
    let i = 1;
    let error = tolerance + 1;
    // Perform the iterations
    do {
      // Calculate the next x value
      const fx0 = evaluate(expression, { x: x0 });
      const fx1 = evaluate(expression, { x: x1 });
      const xNext = x1 - ((fx1 * (x1 - x0)) / (fx1 - fx0));
  
      // Calculate the error
      error = Math.abs((xNext - x1) / xNext);
  
      // Add the current iteration's results to the array
      results.push({ iteration: i+1, x0: x0, x1: x1, xNext: xNext, error: error });
      i++;
      // Update the values for the next iteration
      x0 = x1;
      x1 = xNext;
    }while (error > tolerance && i <= iter)
  
    // Update the state with the results
    setTableData(results);
  }
  

  return (
    <div>
      <TextField
        label="Function"
        value={expression}
        onChange={(event) => setExpression(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Initial Guess 1"
        value={initialGuess1}
        onChange={(event) => setInitialGuess1(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Initial Guess 2"
        value={initialGuess2}
        onChange={(event) => setInitialGuess2(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Tolerance"
        value={tolerance}
        onChange={(event) => setTolerance(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Max Iterations"
        value={maxIterations}
        onChange={(event) => setMaxIterations(event.target.value)}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calculate
      </Button>
      <div>
        {/* Form component */}
        {/* Results component */}
        {tableData.length > 0 && (
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
        {showTable && <IterationTable data={tableData} />}
      </div>
    </div>
  );
}

export default SecantMethod;
