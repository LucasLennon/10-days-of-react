import React, { useEffect, useState, Fragment } from 'react';

// import styled from "styled-components"
// import { makeStyles } from '@material-ui/core/styles';
import { 
  // AppBar,
  // Toolbar,
  // // IconButton,
  // Typography,
  Container, 
  Box,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core"
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));


function Login() {
  // const classes = useStyles();
  const [form, setForm] = useState({
    login: null,
    password: null,
  });

  // useEffect(() => {
  //   console.log(form);
  // });

  return (
    <Container>
      <Box p={2}>
        <FormControl>
          <InputLabel htmlFor="my-input">Email address</InputLabel>
          <Input onChange={(e) => setForm({ login: e.target.value })} aria-describedby="my-helper-text" />
          {/* <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText> */}
        </FormControl>
      </Box>
    </Container>
  );
}

export default Login;
