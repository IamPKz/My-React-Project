import { React, useState } from "react";

import { NavLink } from "react-router-dom";

import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography,
  Divider,
} from "@mui/material";

const List_Method = ["Bisection", "False_Position", "Newton", "One_Point", "Taylor" , "Secant"];

const List_Technical = [
  "Cramer",
  "Guass_Eli",
  "Guass_Jordan",
  "Matrix_Invers",
  "LU",
  "Cholesky",
  "Jacobi",
  "Conjugate",
];

function Leftbar() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Container
      component="nav">
      <List>
        <Typography variant="h4" sx={{ padding: 5 }}>
          Select method
        </Typography>
        <Divider />
        <ListItemButton onClick={() => setOpen1(!open1)}>
          <ListItemText>
            <Typography variant="h5">
              Methods
            </Typography>
          </ListItemText>
        </ListItemButton>

        <Collapse in={open1} timeout="auto" unmountOnExit>
          {List_Method.map((text) => (
            <List>
              <ListItemButton
                sx={{ pl: 5 }}
                component={NavLink}
                to={"/" + text}
              >
                <ListItemText>
                  <Typography variant="h5">
                    {text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          ))}
        </Collapse>
        <ListItemButton onClick={() => setOpen2(!open2)}>
          <ListItemText>
            <Typography variant="h5">
              Technical
            </Typography>
          </ListItemText>
        </ListItemButton>

        <Collapse in={open2} timeout="auto" unmountOnExit>
          {List_Technical.map((text) => (
            <List>
              <ListItemButton
                sx={{ pl: 5 }}
                component={NavLink}
                to={"/" + text}
              >
                <ListItemText>
                  <Typography variant="h5">
                    {text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </List>
          ))}
        </Collapse>
      </List>
    </Container>
  );
}

export default Leftbar;
