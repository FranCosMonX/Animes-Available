import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Base } from "../../elementoHTMLEstatico";

interface Usuario {
  logado: Boolean;
  usuario: string;
  jogoPreferido: string;
  animePreferido: string;
  hobby: string;
  nomeCompleto: string;
  email: string;
  senha: string;
}

export default function Perfil() {
  const [inicializado, setInicializado] = useState(false)
  const [usuario, setUsuario] = useState<Usuario>()
  const navigate = useNavigate()

  useEffect(() => {
    if (!inicializado) {
      const resultado = sessionStorage.getItem('usuario')
      if (resultado) {
        const usuario: Usuario = JSON.parse(resultado)
        setUsuario(usuario)
      } else {
        sessionStorage.removeItem('usuario')
        navigate('/')
      }
      setInicializado(true)
    }
  }, [inicializado])

  return (
    <Base>
      <Card sx={{ background: 'none', width: '90%', margin: '25px' }}>
        <CardContent>
          <Typography color={'primary'} textAlign={'center'} variant="h4">INFORMAÇÕES DE USUÁRIO</Typography>
          <Grid container display={'flex'} flexDirection={'column'} gap={1} marginTop={2}>
            <Grid item>
              <Typography color={'primary'}>Usuário: {usuario?.usuario}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Jogo preferido: {usuario?.jogoPreferido}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Anime preferido: {usuario?.animePreferido}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Hobby: {usuario?.hobby}</Typography>
            </Grid>
            <Divider sx={{ backgroundColor: 'white' }} />
            <Grid item>
              <Typography color={'primary'}>Nome Completo: {usuario?.nomeCompleto}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Email: {usuario?.email}</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Senha: {usuario?.senha}</Typography>
            </Grid>
            <Grid item display={'flex'} gap={2} justifyContent={'center'}>
              <Button color="secondary" variant="contained" type="button">Editar Perfil</Button>
              <Button color="secondary" variant="contained" type="button">Editar credenciais</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Base>
  )
}