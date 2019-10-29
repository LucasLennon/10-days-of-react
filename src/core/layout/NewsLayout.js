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

const ButtonStyle = makeStyles(theme => ({
  active: {
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.contrastText
  },
  inactive: {
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.secondary.contrastText
  }
}));

function NewsLayout(props) {
  const contentTypeButtonStyle = ButtonStyle();
  const classes = useStyles();
  const [sidebar, setSidebar] = useState(false);

  const buttonListTypes = [
    {
     name: "News",
     href: "/news"
    },
    {
     name: "Tops",
     href: "/tops"
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
                {buttonListTypes.map((value, key) => {
                  return (
                    <Button
                      disabled={props.loading}
                      key={key}
                      className={
                        props.location.pathname === value.href
                          ? contentTypeButtonStyle.active
                          : contentTypeButtonStyle.inactive
                      }
                      href={value.href}
                    >
                      {value.name}
                    </Button>
                  );
                })}
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
