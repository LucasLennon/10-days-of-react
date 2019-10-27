import React, {
  useState,
} from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Grid,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import {
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import Sidebar from "./BaseSidebar";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

function MainLayout(props) {
  // const {  } = useRouteMatch();
  const classes = useStyles();
  const [sidebar, setSidebar] = useState(false);
  
  return (
    <Box>
      <Sidebar open={sidebar} onClose={() => setSidebar(!sidebar)} />
      <AppBar position="static">
        <Toolbar>
          <Grid item xs={8}>
            <Box display="inline-flex" alignItems="center">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={() => setSidebar(!sidebar)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {props.pageName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <ButtonGroup>
              <Button>News</Button>
              <Button>Ask</Button>
              <Button>Show</Button>
              <Button>Jobs</Button>
            </ButtonGroup>
          </Grid>
        </Toolbar>
      </AppBar>

      {props.children}
      
    </Box>
  );
}

export default MainLayout;
