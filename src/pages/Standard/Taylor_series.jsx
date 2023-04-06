import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { evaluate, derivative, factorial} from 'mathjs';

function Taylor_seriesCalculator() {
  const [functionValue, setFunctionValue] = useState("3x^2+5x+2");
  const [x0, setX0] = useState(0);
  const [x1, setX1] = useState(0);
  const [nValue, setNValue] = useState(0);
  const [result, setResult] = useState(0);



  const calculateSeries = () => {
    const x0val = parseFloat(x0);
    const x1val = parseFloat(x1);
    const n = parseInt(nValue);
    let sum = 0;
    let term = 0;
    let derfunc = functionValue;
    sum += evaluate(derfunc,{x:x0val})

     for (let i = 1; i <= n; i++) {
      derfunc = derivative(derfunc, 'x').toString()
      const deri = evaluate(derfunc,{x:x0val})*(Math.pow(x1val-x0val,i)/factorial(i))
      sum += deri
    }

    setResult(sum.toFixed(6));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Taylor Series Method Calculator</h1>
      <TextField
        label="Function"
        value={functionValue}
        onChange={(e) => setFunctionValue(e.target.value)}
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="x0"
        value={x0}
        onChange={(e) => setX0(e.target.value)}
        type="number"
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="x1"
        value={x1}
        onChange={(e) => setX1(e.target.value)}
        type="number"
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      <TextField
        label="n"
        value={nValue}
        onChange={(e) => setNValue(e.target.value)}
        type="number"
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" onClick={calculateSeries}>
        Calculate
      </Button>
      <div style={{ marginTop: '20px' }}>
        <label>Result:</label>
        <span style={{ marginLeft: '10px' }}>{result}</span>
      </div>
    </div>
  );
}

export default Taylor_seriesCalculator;
