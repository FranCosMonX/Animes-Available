import { Button, Card, Container, Grid, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import imagemAnimes from '../../../assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { Header } from "../elementoHTMLEstatico"
import './login.css'

const Login = () => {
  const navigate = useNavigate()

  return (
    <Container disableGutters>
      <Header />
      <form>
        <img
          src={imagemAnimes}
          alt="Imagem contendo alguns atores em filmes de ação encontradas na plataforma da netflix"
        />
        <Card sx={{
          width: "450px",
          display: 'flex',
          flexDirection: 'column',
          alignItens: 'center',
          gap: '10px',
          padding: '10px 5px',
          position: 'absolute'
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
            <Button
              color="secondary"
              variant="text"
              type="button"
              onClick={() => {
                navigate('/cadastro')
              }}
            >Cadastrar-se</Button>
            <Button color="secondary" variant="contained" type="submit">Logar</Button>
          </Grid>
        </Card>
      </form>
    </Container>
  )
}

export default Login