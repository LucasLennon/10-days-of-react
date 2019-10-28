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

function NewsLayout(props) {
  // const {  } = useRouteMatch();
  const classes = useStyles();
  const [sidebar, setSidebar] = useState(false);

  const buttonListTypes = [
    {
     name: "Tops",
     href: "/tops"
    },
    {
     name: "News",
     href: "/news"
    },
    {
     name: "Ask",
     href: "/ask"
    },
    {
     name: "Show",
     href: "/show"
    },
    {
     name: "Jobs",
     href: "/jobs"
    },
  ]
  
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
            <Box display="flex" justifyContent="flex-end">
              <ButtonGroup>
                {
                  buttonListTypes.map((value,key) => {
                    return (
                      <Button
                        color={
                          props.location.pathname === value.href
                            ? "primary"
                            : "secondary"
                        }
                        href={value.href}
                      >
                        {value.name}
                      </Button>
                    );
                  })
                }
                {/* <Button href={"/tops"}>Tops</Button>
                <Button href={"/news"}>News</Button>
                <Button href={"/ask"}>Ask</Button>
                <Button href={"/show"}>Show</Button>
                <Button href={"/jobs"}>Jobs</Button> */}
              </ButtonGroup>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>

      {props.children}
    </Box>
  );
}

export default NewsLayout;
