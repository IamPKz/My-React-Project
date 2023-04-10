import { useState, useEffect } from "react";
import { TextField, Container, Box, Typography, Button } from "@mui/material";
import { display } from "@mui/system";

function Regression() {
  const [n_matrix, setN_matrix] = useState(1);
  const [arrX , setArrX] = useState([]);
  const [arrY , setArrY] = useState([]);

  const [inputMatrix , setInputMatrix] = useState([[]]);
  const [table , setTable] = useState();
  
  
  let temp = [];
  const render_textfield = (N) => {
      let tempArrX = [];
      let tempArrY = [];

    for (let i = 0; i < N; i++) {

        tempArrX.push(
        <div>
            <TextField
            type="number"
            value={arrX[i]}
            label = "X"
            variant="outlined"

          />
          </div>
        );

        tempArrY.push(
            <div>
                <TextField
                type="number"
                value={arrY[i]}
                label = "Y"
                variant="outlined"
              />
              </div>
            );
    }
    temp.push({a:tempArrX,b:tempArrY})

  }

  const result = () =>{

    return(
        <div>
            {temp.map((data) => (
                <div style={{display:"flex"}}>
                    <div>{data.a}</div>
                    <div>{data.b}</div>
                </div>
            ))}
        </div>
    )
  }
  const handleOnchagecellX = (e,index) => {
    let newMatrix = [...arrX]
    newMatrix[index] = e.target.value
    setArrX(newMatrix)
  };

  const handleOnchagecellY = (e,index) => {
    let newMatrix = [...arrY]
    newMatrix[index] = e.target.value
    setArrY(newMatrix)
  };


  const handleOnchageNmatrix = (e) => {
    const newN = e.target.value;
    setN_matrix(e.target.value)
    setArrX(Array(newN).fill(1))
    setArrY(Array(newN).fill(1))

    render_textfield(newN)
    setTable(result());

    console.log(table);
  };


  return (
    <Container>
      <Typography variant="h1">Regression</Typography>
      <Box>
        <TextField
          value={n_matrix}
          label="N matrix"
          variant="outlined"
          onChange={handleOnchageNmatrix}
        />
        <Button variant="contained">Calculate</Button>
      </Box>
      {table}
    </Container>
  );
}

export default Regression;
