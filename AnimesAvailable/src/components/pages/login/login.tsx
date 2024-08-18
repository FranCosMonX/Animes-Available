import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import imagemAnimes from '../../../assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { Base } from "../elementoHTMLEstatico"
import './login.css'

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const usuario = {
      logado: true,
      usuario: "teste",
      jogoPreferido: "The Legends of Neverland",
      animePreferido: "Code Geass, Toaru Series, etc",
      hobby: "jogar e assistir animes",
      nomeCompleto: "Conta de Teste",
      email: "teste@gmail.com",
      senha: "teste"
    }
    sessionStorage.setItem("usuario", JSON.stringify(usuario))
    navigate('/animes/todos')
  }

  return (
    <Base>
      <form onSubmit={handleSubmit}>
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
    </Base>
  )
}

export default Login