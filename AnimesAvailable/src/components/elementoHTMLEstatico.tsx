import { Button, Grid, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResumoUsuario } from "../@types/usuario.type";
import MenuUsuario from "./MenuUsuario";
import CircularLoading from "./system/CircularProgress";

interface propBase {
  children: ReactNode;
  verificaLogin?: boolean;
}

interface HeaderParams {
  usuarioLogado: boolean;
  nomeUsuario: string;
}

export const Header = ({ usuarioLogado, nomeUsuario }: HeaderParams) => {
  const navigate = useNavigate()

  return (
    <Grid container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ padding: "5px 20px" }}
    >
      <Grid item>
        <Button type="button" onClick={() => {
          if (usuarioLogado)
            navigate('/animes/todos')
          else {
            navigate('/')
          }
        }}>
          <Typography fontWeight={"bold"}>Animes Available</Typography>
        </Button>
      </Grid>
      {usuarioLogado && <MenuUsuario usuario={nomeUsuario} />}
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

export const Base = ({ children, verificaLogin = false }: propBase) => {
  const [inicializado, setInicializado] = useState(false)
  const [emProcessamento, setEmProcessamento] = useState(verificaLogin)
  const [usuarioLogado, setUsuarioLogado] = useState<{ logado: boolean, usuario: string }>({
    logado: false, usuario: ""
  })

  useEffect(() => {
    if (!usuarioLogado.logado && !inicializado) {
      const resultado = sessionStorage.getItem('usuario')
      if (resultado) {
        const usuario: ResumoUsuario = JSON.parse(resultado)

        console.log(usuario)
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
      if (emProcessamento) {
        setTimeout(() => {
          setEmProcessamento(false)
        }, 1000)
      }
    }
  }, [inicializado])

  return (
    <div className="base" >
      {emProcessamento && <CircularLoading />}
      {!emProcessamento && <Header nomeUsuario={usuarioLogado.usuario} usuarioLogado={usuarioLogado.logado} />}
      {!emProcessamento && children}
    </ div>
  )
}