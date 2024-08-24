import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usuario as User } from "../../../../@types/usuario.type";
import { api } from "../../../../common/api/config";
import { Base } from "../../elementoHTMLEstatico";

interface Usuario {
  logado: Boolean;
  usuario: string;
  jogoPreferido: string;
  animePreferido: string;
  hobby: string;
  nomeCompleto: string;
  email: string;
  senha?: string;
  updatedAt: Date;
  createdAt: Date;
}

export default function Perfil() {
  const [inicializado, setInicializado] = useState(false)
  const [dadosUsuario, setDadosUsuario] = useState<User>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!inicializado) {
      const obterDados = async () => {
        await api.get(`/users/${8}`)
          .then((response) => {
            const usuario: User = response.data.usuario
            usuario.logado = true;
            setDadosUsuario(usuario)
            sessionStorage.setItem('usuario', JSON.stringify(usuario))
            console.log(response)
          })
          .catch((err) => {
            sessionStorage.removeItem('usuario')
            navigate('/')
          })
      }
      obterDados()
      setInicializado(true)
    }
  }, [inicializado])

  const handleEditarPerfil = async () => {
    await api.get(`/users/${8}`)
      .then((response) => {
        const usuario: User = response.data.usuario
        setDadosUsuario(usuario)
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Base>
      <Card sx={{ background: 'none', width: '90%', margin: '25px' }}>
        <CardContent>
          <Typography color={'primary'} textAlign={'center'} variant="h4">INFORMAÇÕES DE USUÁRIO</Typography>
          <Grid container display={'flex'} flexDirection={'column'} gap={1} marginTop={2}>
            <Grid item>
              <Typography color={'primary'}>Usuário: {dadosUsuario?.usuario}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Jogo preferido: {dadosUsuario?.jogo_preferido ? dadosUsuario?.jogo_preferido : ""}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Anime preferido: {dadosUsuario?.anime_preferido ? dadosUsuario?.anime_preferido : ""}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Hobby: {dadosUsuario?.hobby ? dadosUsuario?.hobby : ""}</Typography>
            </Grid>
            <Divider sx={{ backgroundColor: 'white' }} />
            <Grid item>
              <Typography color={'primary'}>Nome Completo: {dadosUsuario?.nome_completo}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Email: {dadosUsuario?.email}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Senha: *********</Typography>
            </Grid>
            <Grid item display={'flex'} gap={2} justifyContent={'center'}>
              <Button color="secondary" variant="contained" type="button" onClick={handleEditarPerfil}>Editar Perfil</Button>
              <Button color="secondary" variant="contained" type="button">Editar Informações Pessoais</Button>
              <Button color="secondary" variant="contained" type="button">Alterar Senha</Button>
              <Button variant="contained" type="button">Encerrar Conta</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Base>
  )
}