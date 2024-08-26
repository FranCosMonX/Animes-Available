import { AlertColor, Button, Card, CardContent, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { MensagemDoSistemaParams } from "../../@types/sistema.type";
import { ResumoUsuario, Usuario as User } from "../../@types/usuario.type";
import { api } from "../../common/api/config";
import { useHandleLogout } from "../../common/app/auth";
import { Base } from "../../components/elementoHTMLEstatico";
import MensagemDoSistema from "../../components/system/mensagem";

/**
 * Em milissegundo
 */
const TEMPO_ESPERA_MENSAGEM = 5000
const TEMPO_MENSAGEM_VISIVEL = 4000

export default function Perfil() {
  const [inicializado, setInicializado] = useState(false) //configurações iniciais obrigatórias
  const [dadosUsuario, setDadosUsuario] = useState<User>()
  const [emProcessamento, setEmProcessamento] = useState(false) //Mostrar ao usuário que esta havendo algum processamento
  const [msgSistema, setMsgSistema] = useState<MensagemDoSistemaParams>({
    message: '', severity: "error", time_ms: TEMPO_MENSAGEM_VISIVEL, visible: false
  })
  const [logout, setLogout] = useState(false)
  const handleLogout = useHandleLogout()

  useEffect(() => {
    if (logout)
      handleLogout()
  }, [logout, handleLogout])

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

    //setEmProcessamento(true)
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
            {emProcessamento && <LinearProgress color='secondary' />}
            {
              <Grid item display={'flex'} gap={2} justifyContent={'center'}>
                <Button color="secondary" variant="contained" type="button" disabled={emProcessamento} onClick={handleEditarPerfil}>Editar Perfil</Button>
                <Button color="secondary" variant="contained" type="button" disabled={emProcessamento}>Editar Informações Pessoais</Button>
                <Button color="secondary" variant="contained" type="button" disabled={emProcessamento}>Alterar Senha</Button>
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
  )
}