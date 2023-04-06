import React, { useState } from "react";
import { det } from "mathjs";
import { Box, TextField, Button ,Typography} from "@mui/material";

const CramerRule = () => {
  const [numRows, setNumRows] = useState(2);
  const [matrix, setMatrix] = useState(
    Array.from({ length: numRows }, () =>
      Array.from({ length: numRows }, () => "")
    )
  );
  const [result, setResult] = useState("");

  const handleNumRowsChange = (event) => {
    const newNumRows = parseInt(event.target.value);
    setNumRows(newNumRows);
    setMatrix(
      Array.from({ length: newNumRows }, () =>
        Array.from({ length: newNumRows }, () => "")
      )
    );
  };

  const handleInputChange = (event, row, col) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = event.target.value;
    setMatrix(newMatrix);
  };

  const handleCalculate = () => {
    const matrixA = [];
    const matrixB = [];

    // Create matrix A and B from the input values
    for (let i = 0; i < numRows; i++) {
      matrixA[i] = [];
      for (let j = 0; j < numRows; j++) {
        matrixA[i][j] = parseFloat(matrix[i][j]);
      }
      matrixB[i] = parseFloat(matrix[i][numRows]);
    }

    // Calculate the determinant of matrix A
    const detA = det(matrixA);

    // Calculate the determinants of matrices Ax1, Ax2, ..., Axn
    const detX = [];
    for (let i = 0; i < matrixB.length; i++) {
      const newArr2D = JSON.parse(JSON.stringify(matrixA));
      for (let j = 0; j < matrixA.length; j++) {
        newArr2D[j][i] = matrixB[j];
      }
      detX.push(det(newArr2D));
    }

    // Calculate the solution x1, x2, ..., xn
    const solutions = detX.map((det, index) => {
      return det / detA;
    });

    setResult(solutions);
    console.log(result);
  };

  const renderTable = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const rowInputs = [];
      for (let j = 0; j <= numRows; j++) {
        rowInputs.push(
          <TextField
            key={j}
            type="text"
            value={matrix[i][j]}
            onChange={(event) => handleInputChange(event, i, j)}
            margin="dense"
            variant="outlined"
            size="small"
          />
        );
      }
      rows.push(
        <Box key={i} sx={{ display: "flex", gap: 1 }}>
          {rowInputs}
        </Box>
      );
    }
    return rows;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box>
        <TextField
          label="Number of equations"
          type="number"
          min="2"
          value={numRows}
          onChange={handleNumRowsChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box>
          {renderTable()}
          <Button variant="contained" onClick={handleCalculate}>
            Calculate
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {result}
    </Box>
    </Box>
  );
};

export default CramerRule;
