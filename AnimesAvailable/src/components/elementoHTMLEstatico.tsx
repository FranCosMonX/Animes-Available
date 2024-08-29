import { Button, Grid, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MensagemDoSistemaParams } from "../@types/sistema.type";
import { ResumoUsuario, Usuario } from "../@types/usuario.type";
import { api } from "../common/api/config";
import { useHandleLogout } from "../common/app/auth";
import { TEMPO_MENSAGEM_VISIVEL } from "../common/app/constants";
import MenuUsuario from "./MenuUsuario";
import CircularLoading from "./system/CircularProgress";
import MensagemDoSistema from "./system/mensagem";

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
  const handleLogout = useHandleLogout()
  const [inicializado, setInicializado] = useState(false)
  const [emProcessamento, setEmProcessamento] = useState(verificaLogin)
  const [usuarioLogado, setUsuarioLogado] = useState<{ logado: boolean, usuario: string }>({
    logado: false, usuario: ""
  })
  const [systemM, setSystemM] = useState<MensagemDoSistemaParams>({
    message: '', severity: "error", time_ms: TEMPO_MENSAGEM_VISIVEL, visible: false
  })

  useEffect(() => {
    if (verificaLogin) {
      console.log(usuarioLogado)
      setTimeout(() => {
        console.log('entrou 1')
        if (!usuarioLogado.logado) {
          setEmProcessamento(true)
          console.log('entrou 2')
          setSystemM({
            ...systemM,
            message: "Usuário deslogado",
            severity: "info",
            time_ms: 3000,
            visible: true
          })

          setTimeout(() => {
            handleLogout()
          }, 3100)
        } else {
          setEmProcessamento(false)
        }
      }, 200)
    }
  }, [usuarioLogado, emProcessamento])

  useEffect(() => {
    if (verificaLogin) {
      if (!inicializado) {
        const resultado = sessionStorage.getItem('usuario')
        if (resultado) {
          const usuario: ResumoUsuario = JSON.parse(resultado)

          handleCheckUsuario(usuario.id)
        } else {
          setUsuarioLogado({
            usuario: "",
            logado: false
          })
        }
      }
    }
    setInicializado(true)
  }, [inicializado])

  const handleCheckUsuario = async (userID: number) => {
    await api.get(`/users/${userID}`)
      .then((res) => {
        const usuario: Usuario = res.data.usuario
        usuarioLogado.logado = true
        usuarioLogado.usuario = usuario.usuario
      })
      .catch(() => {
        usuarioLogado.logado = false
      })
  }

  return (
    <div className="base" >
      {emProcessamento && <CircularLoading />}
      {
        systemM.visible &&
        <MensagemDoSistema
          visible={false}
          message={systemM.message}
          severity={systemM.severity}
          time_ms={systemM.time_ms}
        />
      }
      {!emProcessamento && <Header nomeUsuario={usuarioLogado.usuario} usuarioLogado={usuarioLogado.logado} />}
      {!emProcessamento && children}
    </ div>
  )
}