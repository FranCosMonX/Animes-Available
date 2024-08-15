import { Button, Card, Container, Grid, TextField, Typography } from "@mui/material"
import { Header } from "../../elementoHTMLEstatico"

const Login = () => {
  return (
    <Container disableGutters>
      <Header />
      <form>
        <Card sx={{
          width: "450px",
          display: 'flex',
          flexDirection: 'column',
          alignItens: 'center',
          gap: '10px',
          padding: '10px 5px'
        }}>
          <Typography variant="h4" textAlign={"center"}>Login</Typography>
          <TextField
            variant="outlined"
            label="Usuário"
            type="text"
            color="secondary"
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            color="secondary"
          />
          <Grid container item display={"flex"} justifyContent={"space-between"}>
            <Button color="secondary" variant="text" type="button">Cadastrar-se</Button>
            <Button color="secondary" variant="contained" type="submit">Logar</Button>
          </Grid>
        </Card>
      </form>
    </Container>
  )
}

export default Login