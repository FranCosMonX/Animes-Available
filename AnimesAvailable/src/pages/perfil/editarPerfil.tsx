import { zodResolver } from "@hookform/resolvers/zod";
import { AlertColor, Button, Card, CardContent, CardHeader, Checkbox, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../../common/api/config";
import { editarPerfilFormData, editarPerfilSchema } from "./schema/editarPerfil.schema";

interface EditarPerfilParams {
  updatedAt: Date,
  userID: number,
  atualizarDados: () => void
  enableSystemMessage: (message: string, severity: AlertColor, tempo_espera_para_processamento?: number, tempo_msnsagem_visivel?: number) => void
}

export default function EditarPerfil({ updatedAt, userID, atualizarDados, enableSystemMessage }: EditarPerfilParams) {
  const atualizadoEm = new Date(updatedAt)
  const [sendData, setSendData] = useState<{
    usuario: boolean, anime_preferido: boolean, jogo_preferido: boolean, hobby: boolean
  }>({
    usuario: false, anime_preferido: false, jogo_preferido: false, hobby: false
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<editarPerfilFormData>({
    resolver: zodResolver(editarPerfilSchema)
  })

  const onSubmit: SubmitHandler<editarPerfilFormData> = async (data) => {
    if (!!sendData.usuario && (data.usuario == '' || !data.usuario || data.usuario.length < 5)) {
      setError('usuario', { message: "O campo de usuário não pode estar em branco e tem que ter no mínimo 5 caracteres." })
      return
    }
    if (!sendData.usuario && !sendData.anime_preferido && !sendData.jogo_preferido && !sendData.hobby) {
      enableSystemMessage("É necessário preencher algum campo para atualizar os dados", "error")
      return
    }


    let jogo_preferido, anime_preferido, hobby, usuario;
    if (sendData.anime_preferido) anime_preferido = data.anime_preferido
    if (sendData.jogo_preferido) jogo_preferido = data.jogo_preferido
    if (sendData.hobby) hobby = data.hobby
    if (sendData.usuario) usuario = data.usuario

    api.patch(`/users/${userID}/perfil/informacaoPublica`, { anime_preferido, jogo_preferido, hobby, usuario })
      .then((res) => {
        console.log(res)
        enableSystemMessage("Dados atualizados com sucesso!", 'success')
        atualizarDados()
      })
      .catch((err) => {
        enableSystemMessage(!!err.response.data.message ? err.response.data.message : "Houve uma falha em atualizar os dados", 'error')
        atualizarDados()
      })

  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="form_popup">
        <Card sx={{ padding: "10px" }}>
          <CardHeader
            title="Editar informações de Perfil"
            subheader={`Atualizado em ${atualizadoEm}`}
          />
          <CardContent
            sx={{
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "12px"
            }}
          >
            <Typography variant="body2">Informação(ões) a ser(em) atualizada(s).</Typography>
            <Grid container gap={2} maxWidth={"600px"}>
              <Grid item display={"flex"} gap={1} md={12} xs={12} lg={12}>
                <TextField
                  label="Usuário"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  {...register('usuario')}
                  error={!!errors.usuario}
                  helperText={errors.usuario?.message}
                />
                <Checkbox
                  checked={sendData.usuario}
                  color="secondary"
                  onChange={() => setSendData({ ...sendData, usuario: !sendData.usuario })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
              <Grid item display={"flex"} gap={1} md={12} xs={12} lg={12}>
                <TextField
                  label="Jogo Preferido"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  {...register('jogo_preferido')}
                  error={!!errors.jogo_preferido}
                  helperText={errors.jogo_preferido?.message}
                />
                <Checkbox
                  checked={sendData.jogo_preferido}
                  color="secondary"
                  onChange={() => setSendData({ ...sendData, jogo_preferido: !sendData.jogo_preferido })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
              <Grid item display={"flex"} gap={1} md={12} xs={12} lg={12}>
                <TextField
                  label="Anime Preferido"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  {...register('anime_preferido')}
                  error={!!errors.anime_preferido}
                  helperText={errors.anime_preferido?.message}
                />
                <Checkbox
                  checked={sendData.anime_preferido}
                  color="secondary"
                  onChange={() => setSendData({ ...sendData, anime_preferido: !sendData.anime_preferido })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
              <Grid item display={"flex"} gap={1} md={12} xs={12} lg={12}>
                <TextField
                  label="Hobby"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  {...register('hobby')}
                  error={!!errors.hobby}
                  helperText={errors.hobby?.message}
                />
                <Checkbox
                  checked={sendData.hobby}
                  color="secondary"
                  onChange={() => setSendData({ ...sendData, hobby: !sendData.hobby })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
            </Grid>

            <Grid container item display={"flex"} justifyContent={"right"}>
              <Button color="secondary" type="submit" variant="contained">Atualizar</Button>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </React.Fragment>
  )
}