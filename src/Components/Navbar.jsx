import { React, useState } from "react";
import Leftbar from "./Leftbar";

import {
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  Box,
  Drawer,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
const drawerWidth = 240;
function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleSlider = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton onClick={toggleSlider}>
          <Menu sx={{ color:"#fff" ,padding: 1 }}/>
        </IconButton>
        <Typography variant="h5">
          Numerical Methods
        </Typography>
      </Toolbar>
      <Box >
        <Drawer
          className="menuSliderContainer"
          open={open}
          anchor="left"
          onClose={toggleSlider}
          variant="temporary"
        >
          <Leftbar />
        </Drawer>
      </Box>
    </AppBar>
  );
}

export default Navbar;
