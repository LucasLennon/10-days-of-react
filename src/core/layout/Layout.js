import React, { 
  // useEffect, 
  useState, 
  Fragment 
} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton
} from "@material-ui/core"
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import Sidebar from "./BaseSidebar";

import NewsList from "../page/NewsList";
import Login from "../page/Login";

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#ff6600'
      },
      secondary: {
        main: '#f6f6ef'
      },
    },
  }
)

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

function MainLayout() {

  // const {  } = useRouteMatch();
  const classes = useStyles();
  const [sidebar, setSidebar] = useState(false);
  const [pageName, setPageName] = useState("Login");

  return (
    <Router>
      <ThemeProvider theme={theme}>

        <Box>
          <Sidebar open={sidebar} onClose={() => setSidebar(!sidebar)}/>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setSidebar(!sidebar)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {pageName}
              </Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact path="/" render={
              () => {
                setPageName("News")
                return(
                  <NewsList />
                )
              }
            } />
            <Route path="/Login" render={
              () => {
                setPageName("Login")
                return(
                  <Login />
                )
              }
            } />
            <Route path="/register" render={
              () => {
                setPageName("Register")
                return (
                  <Fragment>
                    Being created!
                  </Fragment>
                )
              }
            } />
          </Switch>
        </Box>

      </ThemeProvider>
    </Router>
  )
}

export default MainLayout;
