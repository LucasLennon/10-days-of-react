import React, { useState } from 'react';

import styled from "styled-components"
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container, 
  Box,
  Button
} from "@material-ui/core"
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {
  const classes = useStyles();
  const [form, setForm] = useState({
    login: null,
    password: null,
  });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Login
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Container>
        <Box p={2}>
          teste
        </Box>
      </Container>
    </Box>

  );
}

export default App;
