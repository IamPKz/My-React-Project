import { React, useState, forwardRef, Fragment } from "react";
import axios from "axios";

import {
  Container,
  TextField,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
} from "@mui/material";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { TableVirtuoso } from "react-virtuoso";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";


const One_Point = () => {

  const [api, setApi] = useState({});
  const data = [];
  const [valueIter, setValueIter] = useState([]);
  const [valueX, setValueX] = useState([]);

  const [html, setHtml] = useState(null);
  const [Equation, setEquation] = useState("(x^4)-13");
  const [X, setX] = useState(0);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/api/objects/random")
      .then((response) => {
        setApi(response.data);
      })
      .then(setEquation(api.function))
      .then(setValueX(api.interval[1]))
      .catch((error) => console.error(error));
    console.log(api);
  };


  const columns = [
    {
      width: 120,
      label: "Iteration",
      dataKey: "iteration",
    },
    {
      width: 120,
      label: "X",
      dataKey: "X",
      numeric: true,
    }
  ];

  const VirtuosoTableComponents = {
    Scroller: forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index, row) {
    return (
      <Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </Fragment>
    );
  }

  const print = () => {
    console.log(data);

    return (
      <Container>
        <Paper style={{ height: 400, width: "100%" }}>
          <TableVirtuoso
            data={data}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
        <Paper>
          <Box padding={1} sx={{ display: "flex", justifyContent: "center" }}>
            <Plot
              data={[
                {
                  x: data.map((x) => x.iteration),
                  y: data.map((x) => x.X),
                  type: "scattergl",
                  marker: { color: "red" },
                },
              ]}
              layout={{
                width: "100%",
                height: 500,
                xaxis: {
                  title: {
                    text: "Iteration",
                    font: {
                      family: "Courier New, monospace",
                      size: 18,
                      color: "#7f7f7f",
                    },
                  },
                },
                yaxis: {
                  title: {
                    text: "X",
                    font: {
                      family: "Courier New, monospace",
                      size: 18,
                      color: "#7f7f7f",
                    },
                  },
                },
                legend: {
                  traceorder: "normal",
                  font: {
                    family: "sans-serif",
                    size: 12,
                    color: "black",
                  },
                  bgcolor: "lightgrey",
                  bordercolor: "grey",
                  borderwidth: 2,
                },
              }}
            />
          </Box>
        </Paper>
      </Container>
    );
  };

  const error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  const Calbisection = (x_now) => {
    var ea,x_before;
    var iter = 0;
    var MAX = 4;
    const e = 0.00001;
    var obj = {};
    do {
        x_before = x_now;
        x_now = evaluate(Equation,{x:x_before});
        ea = error(x_before,x_now);
        iter++;

        obj = {
            iteration: iter,
            X: x_now,
          };
          data.push(obj);
      
    } while (ea > e && iter < MAX);

    setX(x_now);
    setValueIter(data.map((x) => x.iteration));
    setValueX(data.map((x) => x.X));

  };

  const inputEquation = (event) => {
    console.log(event.target.value);
    setEquation(event.target.value);
  };

  const inputX = (event) => {
    console.log(event.target.value);
    setValueX(event.target.value);
  };

  const calculateRoot = () => {
    setX(0);
    const xnum = parseFloat(X);
    Calbisection(xnum);

    setHtml(print());

    console.log(valueIter);
    console.log(valueX);

  };

  return (
    <Container
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center", color: " #000" }}
      >
        False-Position Medthod
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <TextField
          type="text"
          value={Equation}
          label="Equetion"
          variant="outlined"
          onChange={inputEquation}
          required
        />
        <TextField
          type="number"
          value={valueX}
          label="X"
          variant="outlined"
          onChange={inputX}
          required
        />
      </Box>
      <Box padding={3} sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={calculateRoot}>
          Calculate
        </Button>
        <Button variant="contained" onClick={fetchData}>
          Random
        </Button>
      </Box>
      <Typography
        variant="h6"
        sx={{ display: "flex", justifyContent: "center", color: " #000" }}
      >
        Answer = {X.toPrecision(7)}
      </Typography>
      <Box>{html}</Box>
    </Container>
  );
};

export default One_Point;
