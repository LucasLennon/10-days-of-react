import React, { useEffect, useState, Fragment } from 'react';
import {
  // BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { 
  Grid,
  Container, 
  Box,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core"


function NewsInside() {
  // const classes = useStyles();
  const [news, SetNews] = useState([])

  return (
    <Container>

      <Grid container justify="center">
        <Box p={2}>
          <List>
            {
              news.map((item) => {
                return (
                  <ListItem button key={item.id}>
                    <Link to={item.path}>
                      <ListItemText primary={item.name} />
                    </Link>
                  </ListItem>
                )
              })
            }
          </List>
        </Box>
      </Grid>

    </Container>
  );
}

export default NewsInside;
