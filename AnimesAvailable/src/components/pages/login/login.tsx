import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import imagemAnimes from '../../../assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { api } from "../../../common/api/config"
import { Base } from "../elementoHTMLEstatico"
import { loginFormData, loginSchema } from "./loginSchema"

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    await api.post("/auth/login", data)
      .then(response => {
        api.defaults.headers.common.Authorization = `Bearer ${response.data.usuario.token}`
        navigate('/animes/todos')
      })
      .catch(error => {
        setError("usuario", { message: error.response.data.mensagem })
        setError("senha", { message: error.response.data.mensagem })
      })
    console.log(data)
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
  }

  return (
    <Base>
      <form className="formIntro" onSubmit={handleSubmit(onSubmit)}>
        <img
          className="planoDeFundoPaginasIniciais"
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
            {...register('usuario')}
            error={!!errors.usuario}
            helperText={errors.usuario?.message}
          />
          <TextField
            variant="outlined"
            label="Senha"
            type="password"
            color="secondary"
            {...register('senha')}
            error={!!errors.senha}
            helperText={errors.senha?.message}
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