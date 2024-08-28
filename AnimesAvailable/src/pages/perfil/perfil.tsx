import { AlertColor, Button, Card, CardContent, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MensagemDoSistemaParams } from "../../@types/sistema.type";
import { ResumoUsuario, Usuario as User } from "../../@types/usuario.type";
import { api } from "../../common/api/config";
import { useHandleLogout } from "../../common/app/auth";
import { TEMPO_ESPERA_MENSAGEM, TEMPO_MENSAGEM_VISIVEL } from "../../common/app/constants";
import { Base } from "../../components/elementoHTMLEstatico";
import MensagemDoSistema from "../../components/system/mensagem";
import AlterarSenha from "./alterarSenha";
import EditarInfosPessoais from "./editarInfoPessoais";
import EditarPerfil from "./editarPerfil";

export default function Perfil() {
  const [emProcessamento, setEmProcessamento] = useState(false) //Mostrar ao usuário que esta havendo algum processamento
  const [inicializado, setInicializado] = useState(false) //configurações iniciais obrigatórias
  const [dadosUsuario, setDadosUsuario] = useState<User>()
  const [logout, setLogout] = useState(false)
  const handleLogout = useHandleLogout()
  const [msgSistema, setMsgSistema] = useState<MensagemDoSistemaParams>({
    message: '', severity: "error", time_ms: TEMPO_MENSAGEM_VISIVEL, visible: false
  })
  const [btnAtualizar, setBtnAtualizar] = useState<{
    infoPublica: boolean, infoPrivada: boolean, senha: boolean
  }>({ infoPrivada: false, infoPublica: false, senha: false })

  useEffect(() => {
    if (logout)
      handleLogout()
  }, [logout, handleLogout])


  /**
   * carregar os dados do usuário ao carregar a página de usuário
   */
  useEffect(() => {
    if (!inicializado) {
      setEmProcessamento(true)
      getDadosUsuario().finally(() => setInicializado(true))
    }
  }, [inicializado])

  /**
   * Atualizar os dados do usuário
   * @returns 
   */
  const getDadosUsuario = async () => {
    const usuarioResumido = sessionStorage.getItem('usuario')
    if (!usuarioResumido) {

      enableSystemMessage("Usuário não encontrado!", "error");
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
      .catch((err) => {
        enableSystemMessage("Usuário não encontrado!", "error");
        console.log(err)
        setTimeout(() => {
          setLogout(true)
        }, TEMPO_ESPERA_MENSAGEM)
      })
  }

  /**
   * Habilitar campo de erro usando a mensagem do sistema
   * @param message 
   * @param severity 
   */
  const enableSystemMessage = (message: string, severity: AlertColor, tempo_espera_para_processamento?: number, tempo_msnsagem_visivel?: number) => {
    setMsgSistema({
      severity: severity,
      message: message,
      visible: true,
      time_ms: tempo_msnsagem_visivel ? tempo_msnsagem_visivel : TEMPO_MENSAGEM_VISIVEL
    })

    setTimeout(() => {
      setMsgSistema({ ...msgSistema, visible: false })
    }, tempo_espera_para_processamento ? tempo_espera_para_processamento : TEMPO_ESPERA_MENSAGEM);
  }

  //Buttons
  const handleEditarPerfil = () => {
    setBtnAtualizar({
      infoPrivada: false,
      infoPublica: true,
      senha: false
    })
  }

  const handleEditarInfosPrivadas = () => {
    setBtnAtualizar({
      infoPrivada: true,
      infoPublica: false,
      senha: false
    })
    console.log(btnAtualizar)
  }

  const handleAlterarSenha = () => {
    setBtnAtualizar({
      infoPrivada: false,
      infoPublica: false,
      senha: true
    })
    console.log(btnAtualizar)
  }

  //CALLBACKS  
  const callbackModalOK = () => {
    getDadosUsuario()
  }

  const callbackCloseModal = () => {
    setBtnAtualizar({
      infoPrivada: false,
      infoPublica: false,
      senha: false
    })
  }

  const handleModal = () => {
    if (
      !dadosUsuario ||
      !(btnAtualizar.infoPrivada || btnAtualizar.infoPublica || btnAtualizar.senha)
    ) return false

    if (btnAtualizar.infoPublica)
      return (
        <EditarPerfil
          updatedAt={dadosUsuario.updatedAt}
          userID={dadosUsuario.id}
          atualizarDados={callbackModalOK}
          fecharModal={callbackCloseModal}
          enableSystemMessage={enableSystemMessage}
        />
      )
    else if (btnAtualizar.infoPrivada)
      return (
        <EditarInfosPessoais
          updatedAt={dadosUsuario.updatedAt}
          userID={dadosUsuario.id}
          atualizarDados={callbackModalOK}
          fecharModal={callbackCloseModal}
          enableSystemMessage={enableSystemMessage}
        />
      )
    else
      return (
        <AlterarSenha
          updatedAt={dadosUsuario.updatedAt}
          userID={dadosUsuario.id}
          atualizarDados={callbackModalOK}
          fecharModal={callbackCloseModal}
          enableSystemMessage={enableSystemMessage}
        />
      )
  }

  return (
    <Base verificaLogin={true}>
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
      {handleModal()}
    </Base>
  )
}