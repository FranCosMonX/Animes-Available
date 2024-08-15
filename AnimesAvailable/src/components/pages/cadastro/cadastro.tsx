import { Button, Card, Container, Grid, TextField, Typography } from "@mui/material"
import { FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import imagemAnimes from '../../../assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { Header } from "../elementoHTMLEstatico"

const Cadastro = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <Container disableGutters>
      <Header />
      <form onSubmit={handleSubmit}>
        <img
          src={imagemAnimes}
          alt="Imagem contendo alguns atores em filmes de ação encontradas na plataforma da netflix"
        />
        <Card
          sx={{
            width: "450px",
            display: 'flex',
            flexDirection: 'column',
            alignItens: 'center',
            gap: '10px',
            padding: '10px 5px',
            position: 'absolute'
          }}
        >
          <Typography variant="h4" textAlign={"center"}>Cadastrar-se</Typography>
          <TextField
            variant="outlined"
            label="Nome Completo"
            type="text"
            color="secondary"
          />
          <TextField
            variant="outlined"
            label="Usuário"
            type="text"
            color="secondary"
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            color="secondary"
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            color="secondary"
          />
          <TextField
            variant="outlined"
            label="Repetir Senha"
            type="password"
            color="secondary"
          />
          <Grid container item display={"flex"} justifyContent={"space-between"}>
            <Button
              color="secondary"
              variant="text"
              type="button"
              onClick={() => navigate('/login')}
            >Ja possuo conta</Button>
            <Button color="secondary" variant="contained" type="submit" >Concluir</Button>
          </Grid>
        </Card>
      </form>
    </Container>
  )
}

export default Cadastro