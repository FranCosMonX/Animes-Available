import { Button, Grid, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuUsuario from "../MenuUsuario";

const BaseStyle: React.CSSProperties | undefined = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
}

interface propBase {
  children: ReactNode;
}

export const Header = () => {
  const [inicializado, setInicializado] = useState(false)
  const [usuarioLogado, setUsuarioLogado] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!usuarioLogado) {
      const resultado = sessionStorage.getItem('usuario')
      if (resultado) {
        const usuario: {
          logado: Boolean,
          nome: string,
          jogoPreferido: string,
          animePreferido: string,
          hobby: string,
          nomeCompleto: string,
          email: string,
          senha: string
        } = JSON.parse(resultado)

        console.log(usuario.logado)
        if (usuario.logado)
          setUsuarioLogado(true)
        else
          setUsuarioLogado(false)
      } else {
        setUsuarioLogado(false)
      }
      setInicializado(true)
    }
  }, [inicializado])

  return (
    <Grid container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ padding: "5px 20px" }}
    >
      <Grid item>
        <Button type="button" onClick={() => {

          console.log(usuarioLogado)
          if (usuarioLogado)
            navigate('/animes/todos')
          else {
            navigate('/')
          }

        }}>
          <Typography fontWeight={"bold"}>Avaliador de Filmes</Typography>
        </Button>
      </Grid>
      {usuarioLogado && <MenuUsuario />}
      {
        !usuarioLogado &&
        <Grid item display={"flex"} gap={2}>
          <Button color="secondary" variant="contained" onClick={() => navigate('/cadastro')}>CADASTRAR</Button>
          <Button color="secondary" variant="contained" onClick={() => navigate('/login')}> LOGIN</Button>
        </Grid>
      }
    </Grid >
  )
}

export const Footer = () => {
  return (
    <Grid container item
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      sx={{ padding: "10px 20px" }}
      className="footer"
    >
      <p>Este site o resultado para uma atividade proposta pela talentos Cloud.</p>
      <p>Desenvolvido por Francisco Xavier.</p>
    </Grid>
  )
}

export const Base = ({ children }: propBase) => {
  return (
    <div style={BaseStyle}>
      <Header />
      {children}
    </ div>
  )
}