import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import imagemAnimes from '../../assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { api } from "../../common/api/config"
import { Base } from "../../components/elementoHTMLEstatico"
import { cadastroFormData, cadastroSchema } from "./cadastroSchema"

const Cadastro = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<cadastroFormData>({
    resolver: zodResolver(cadastroSchema),
  })

  const onsubmit: SubmitHandler<cadastroFormData> = async (data) => {
    await api.post("/auth/cadastrar", data)
      .then(() => {
        navigate('/login')
      })
      .catch(error => {
        setError(error.response.data.entidade, { message: error.response.data.mensagem })
      })

  }

  return (
    <Base>
      <form className="formIntro" onSubmit={handleSubmit(onsubmit)}>
        <img
          className="planoDeFundoPaginasIniciais"
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
            {...register('nome_completo')}
            error={!!errors.nome_completo}
            helperText={errors.nome_completo?.message}
          />
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
            label="Email"
            type="email"
            color="secondary"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
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
          <TextField
            variant="outlined"
            label="Repetir Senha"
            type="password"
            color="secondary"
            {...register('repetirSenha')}
            error={!!errors.repetirSenha}
            helperText={errors.repetirSenha?.message}
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
    </Base>
  )
}

export default Cadastro