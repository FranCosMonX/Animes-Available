import { zodResolver } from "@hookform/resolvers/zod"
import { Alert, Button, Card, Grid, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { MensagemParams } from "../../../@types/sistema.type"
import { Usuario } from "../../../@types/usuario.type"
import imagemAnimes from '../../../assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { api } from "../../../common/api/config"
import { Base } from "../elementoHTMLEstatico"
import { loginFormData, loginSchema } from "./loginSchema"

const Login = () => {
  const navigate = useNavigate()
  const [msgSistema, setMsgSistema] = useState<MensagemParams>({
    message: "", visible: false, severity: "info"
  })

  useEffect(() => {
    if (msgSistema.visible) {
      setTimeout(() => {
        setMsgSistema({
          ...msgSistema,
          visible: false
        })
      }, 4000);
    }
  }, [msgSistema])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<loginFormData> = async (data) => {
    await api.post("/auth/login", data)
      .then(async response => {
        const resposta: { id: number, token: string } = response.data.usuario
        api.defaults.headers.common.Authorization = `Bearer ${resposta.token}`

        await api.get(`/users/${resposta.id}`)
          .then((res) => {
            const usuario: Usuario = res.data.usuario
            usuario.logado = true
            sessionStorage.setItem('usuario', JSON.stringify(usuario))
            navigate('/animes/todos')
          })
          .catch((error) => {
            setMsgSistema({
              visible: true,
              message: error.response.data.message,
              severity: "error"
            })
            api.defaults.headers.common.Authorization = ""
          })
      })
      .catch(error => {
        setMsgSistema({
          visible: true,
          message: error.response.data.message,
          severity: "error"
        })
      })
    // const usuario = {
    //   logado: true,
    //   usuario: "teste",
    //   jogoPreferido: "The Legends of Neverland",
    //   animePreferido: "Code Geass, Toaru Series, etc",
    //   hobby: "jogar e assistir animes",
    //   nomeCompleto: "Conta de Teste",
    //   email: "teste@gmail.com",
    //   senha: "teste"
    // }
    // sessionStorage.setItem("usuario", JSON.stringify(usuario))
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
          {
            msgSistema.visible &&
            <Alert severity={msgSistema.severity} variant="outlined">{msgSistema.message}</Alert>
          }
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