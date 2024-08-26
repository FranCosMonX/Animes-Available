import { Button, Grid, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumoUsuario } from "../../@types/usuario.type";
import MenuUsuario from "../MenuUsuario";

interface propBase {
  children: ReactNode;
}

export const Header = () => {
  const [inicializado, setInicializado] = useState(false)
  const [usuarioLogado, setUsuarioLogado] = useState<{ logado: boolean, usuario: string }>({
    logado: false, usuario: ""
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (!usuarioLogado.logado && !inicializado) {
      const resultado = sessionStorage.getItem('usuario')
      if (resultado) {
        const usuario: ResumoUsuario = JSON.parse(resultado)

        console.log(usuario.logado)
        if (usuario.logado)
          setUsuarioLogado({
            logado: true,
            usuario: usuario.usuario
          })
        else
          setUsuarioLogado({
            usuario: "",
            logado: false
          })
      } else {
        setUsuarioLogado({
          usuario: "",
          logado: false
        })
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
          <Typography fontWeight={"bold"}>Animes Available</Typography>
        </Button>
      </Grid>
      {usuarioLogado.logado && <MenuUsuario usuario={usuarioLogado.usuario} />}
      {
        !usuarioLogado.logado &&
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
    <div className="base" >
      <Header />
      {children}
    </ div>
  )
}