import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const List_Method = ["Bi", "False_Po", "Graphical", "Newton", "One_Point"];

const List_Technical = [
  "Cremer",
  "Guass_Eli",
  "Guass_Jordan",
  "Matrix_Invers",
  "LU",
  "Cholesky",
  "Jacobi",
  "Conjugate",
];

const Sider = () => {
  return (
    <Box component="div">
    <Divider />
    <List>
      {List_Method.map((text) => (
        <ListItem>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Box>
  );
};

export default Sider;
