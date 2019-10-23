import React, { useState } from 'react';
import Login from "../page/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Toolbar,
  // IconButton,
  Typography,
  Container, 
  Box,
  // Button
} from "@material-ui/core"
// import MenuIcon from '@material-ui/icons/Menu';

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
  return (
    <Box>
      
      <Router>
        <Switch>
          <Route path="/">
            <Login></Login>
          </Route>
          <Route path="/register">
              Being created!
          </Route>
        </Switch>
      </Router>

    
    </Box>

  );
}

export default App;
