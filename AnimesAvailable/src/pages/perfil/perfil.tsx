import { AlertColor, Button, Card, CardContent, Divider, Grid, LinearProgress, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MensagemDoSistemaParams } from "../../@types/sistema.type";
import { ResumoUsuario, Usuario as User } from "../../@types/usuario.type";
import { api } from "../../common/api/config";
import { useHandleLogout } from "../../common/app/auth";
import { Base } from "../../components/elementoHTMLEstatico";
import MensagemDoSistema from "../../components/system/mensagem";
import AlterarSenha from "./alterarSenha";
import EditarInfosPessoais from "./editarInfoPessoais";
import EditarPerfil from "./editarPerfil";

/**
 * Em milissegundo
 */
const TEMPO_ESPERA_MENSAGEM = 5000
const TEMPO_MENSAGEM_VISIVEL = 4000

export const perfil = {
  button: {
    infoPublica: false
  }
}

export default function Perfil() {
  const [emProcessamento, setEmProcessamento] = useState(false) //Mostrar ao usuário que esta havendo algum processamento
  const [inicializado, setInicializado] = useState(false) //configurações iniciais obrigatórias
  const [dadosUsuario, setDadosUsuario] = useState<User>()
  const [modalOpen, setModalOpen] = useState(false)
  const [logout, setLogout] = useState(false)
  const handleLogout = useHandleLogout()
  const [msgSistema, setMsgSistema] = useState<MensagemDoSistemaParams>({
    message: '', severity: "error", time_ms: TEMPO_MENSAGEM_VISIVEL, visible: false
  })
  const [btnAtualizar, setBtnAtualizar] = useState<{
    infoPublica: boolean, infoPrivada: boolean, senha: boolean
  }>({ infoPrivada: false, infoPublica: perfil.button.infoPublica, senha: false })

  useEffect(() => {
    if (logout)
      handleLogout()
  }, [logout, handleLogout])

  useEffect(() => {
    setBtnAtualizar(prevState => ({
      ...prevState,
      infoPublica: perfil.button.infoPublica
    }));
  }, [perfil.button.infoPublica]);

  useEffect(() => {
    if (!inicializado) {
      setEmProcessamento(true)
      const obterDados = async () => {
        const usuarioResumido = sessionStorage.getItem('usuario')
        if (!usuarioResumido) {

          activateError("Usuário não encontrado!", "error");
          setTimeout(() => {
            setLogout(true)
          }, TEMPO_ESPERA_MENSAGEM)
          return
        }
        const usuario: ResumoUsuario = JSON.parse(usuarioResumido);

        await api.get(`/users/${usuario.id}`)
          .then((response) => {
            const usuario: User = response.data.usuario
            usuario.logado = true;
            setDadosUsuario(usuario)
            sessionStorage.setItem('usuario', JSON.stringify(usuario))
            console.log(response)
            setEmProcessamento(false)
          })
          .catch(() => {
            activateError("Usuário não encontrado!", "error");

            setTimeout(() => {
              setLogout(true)
            }, TEMPO_ESPERA_MENSAGEM)
          })
      }
      obterDados()
      setInicializado(true)
    }
  }, [inicializado])

  /**
   * Habilitar campo de erro usando a mensagem do sistema
   * @param message 
   * @param severity 
   */
  const activateError = (message: string, severity: AlertColor) => {
    setMsgSistema({
      ...msgSistema,
      severity: severity,
      message: message,
      visible: true
    })

    setTimeout(() => {
      setMsgSistema({ ...msgSistema, visible: false })
    }, TEMPO_ESPERA_MENSAGEM);
  }

  const handleEditarPerfil = () => {
    setModalOpen(false)
    setBtnAtualizar({
      infoPrivada: false,
      infoPublica: true,
      senha: false
    })
    setModalOpen(true)
    console.log(btnAtualizar)
  }

  const handleEditarInfosPrivadas = () => {
    setModalOpen(false)
    setBtnAtualizar({
      infoPrivada: true,
      infoPublica: false,
      senha: false
    })
    setModalOpen(true)
    console.log(btnAtualizar)
  }

  const handleAlterarSenha = () => {
    setModalOpen(false)
    setBtnAtualizar({
      infoPrivada: false,
      infoPublica: false,
      senha: true
    })
    setModalOpen(true)
    console.log(btnAtualizar)
  }

  const handleModal = () => {
    let componente: JSX.Element;
    if (!dadosUsuario) {
      console.log("Erro, sem dados do usuario")
      return false
    }

    if (btnAtualizar.infoPublica)
      componente = (
        <EditarPerfil updatedAt={dadosUsuario.updatedAt} />
      )
    else if (btnAtualizar.infoPrivada)
      componente = (
        <EditarInfosPessoais updatedAt={dadosUsuario.updatedAt} />
      )
    else
      componente = (
        <AlterarSenha updatedAt={dadosUsuario.updatedAt} />
      )


    return (
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          perfil.button.infoPublica = false
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "maxContent",
          alignItems: "center"
        }}
      >
        {componente}
      </Modal>
    )
  }

  return (
    <React.Fragment>
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
              {emProcessamento && <LinearProgress color='secondary' />}
              {
                <Grid item display={'flex'} gap={2} justifyContent={'center'}>
                  <Button color="secondary" variant="contained" type="button" disabled={emProcessamento} onClick={handleEditarPerfil}>Editar Perfil</Button>
                  <Button color="secondary" variant="contained" type="button" disabled={emProcessamento} onClick={handleEditarInfosPrivadas}>Editar Informações Pessoais</Button>
                  <Button color="secondary" variant="contained" type="button" disabled={emProcessamento} onClick={handleAlterarSenha}>Alterar Senha</Button>
                  <Button variant="contained" type="button" disabled={emProcessamento}>Encerrar Conta</Button>
                </Grid>
              }
            </Grid>
          </CardContent>
        </Card>
        {
          msgSistema.visible &&
          <MensagemDoSistema
            visible={false}
            message={msgSistema.message}
            severity={msgSistema.severity}
            time_ms={msgSistema.time_ms}
          />
        }
      </Base>
      {
        modalOpen &&
        dadosUsuario &&
        (btnAtualizar.infoPublica || btnAtualizar.infoPrivada || btnAtualizar.senha) &&
        handleModal()
      }
    </React.Fragment>
  )
}