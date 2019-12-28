import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Box } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Login from "./core/page/Login";
import NewsList from "./modules/News/page/NewsList";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#b24700",
      main: "#ff6600",
      light: "#ff8433",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#f6f6ef",
      light: "#f7f7f2",
      dark: "#acaca7",
      contrastText: "#000000"
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
              render={({ location }) => {
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
