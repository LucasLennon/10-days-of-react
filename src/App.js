import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Box,
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";

import NewsList from "./core/page/NewsList";
import Login from "./core/page/Login";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff6600"
    },
    secondary: {
      main: "#f6f6ef"
    }
  }
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Box>
          <Switch>
            <Route
              path="/login"
              render={() => {
                return <Login />;
              }}
            />
            <Route
              path={["/", "/tops", "/news", "/ask", "/show", "jobs"]}
              render={({location}) => {
                return <NewsList location={location} />;
              }}
            />
            {/* <Route
              path="/register"
              render={() => {
                // setPageName("Register");
                return <Fragment>Being created!</Fragment>;
              }}
            /> */}
          </Switch>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
