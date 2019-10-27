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

import MainLayout from "../layout/Layout";

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
    <MainLayout pageName="Login">

      <Container>
        <Grid container justify="center">

          <Grid item xs={10} sm={8} md={6}>
            <Box mt={3}>
              <Card item>
                <Box p={3}>
                  <form onSubmit={sendForm}>
                    <Grid container justify="center">
                      <Box display="block" width={1}>
                        <Box mb={3}>
                          <FormGroup>
                            <InputLabel htmlFor="my-input">Login</InputLabel>
                            <Input onChange={(e) => setLogin(e.target.value)} aria-describedby="my-helper-text"/>
                          </FormGroup>
                        </Box>
                        <Box mb={3}>
                          <FormGroup>
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} aria-describedby="my-helper-text"/>
                            <FormHelperText id="my-helper-text">Min: 6 letras, 1 maiuscula, 1 minuscula</FormHelperText>
                          </FormGroup>
                        </Box>
                        <Box mb={3}>
                          <Grid container justify="flex-end">
                            <Box width={1/4}>
                              <Input fullWidth type="submit" variant="contained" color="primary">Enviar</Input>
                            </Box>
                          </Grid>
                        </Box>
                      </Box>
                    </Grid>
                  </form>
                </Box>
              </Card>
            </Box>
          </Grid>


        </Grid>
      </Container>
    </MainLayout>
  );
}

export default Login;
