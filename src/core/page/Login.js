import React, { useState } from 'react';

import { 
  Grid,
  FormGroup,
  Container, 
  Box,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core"

import styled from "styled-components"

const Card = styled(Grid)`
  background: #fff;
  box-shadow: 0px 0px 5px 5px rgba(0,0,0,.3); 
  border-radius: .5rem; 
`;

function Login() {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);

  function sendForm(event) {
    event.preventDefault();
    const form = {
      login,
      password
    }
    console.log(form);
  }

  return (
    <Container>
      <Grid container justify="center">

        <Box mt={3}>
          {/* <Card item xs={10} s={8} l={6} xl={4}> */}
          <Card item>
            <Box p={3}>
              <form onSubmit={sendForm}>
                <Grid container>
                  <FormGroup>
                    <FormGroup>
                      <InputLabel htmlFor="my-input">Login</InputLabel>
                      <Input onChange={(e) => setLogin(e.target.value)} aria-describedby="my-helper-text" />
                    </FormGroup>
                    <FormGroup>
                      <InputLabel htmlFor="my-input">Password</InputLabel>
                      <Input type="password" onChange={(e) => setPassword(e.target.value)} aria-describedby="my-helper-text" />
                      <FormHelperText id="my-helper-text">Min: 6 letras, 1 maiuscula, 1 minuscula</FormHelperText>
                    </FormGroup>
                    <FormGroup>
                      <Input type="submit" variant="contained" color="primary">Enviar</Input>
                    </FormGroup>
                  </FormGroup>
                </Grid>
              </form>
            </Box>
          </Card>
        </Box>

      </Grid>
    </Container>
  );
}

export default Login;
