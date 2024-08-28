import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Checkbox, Divider, Grid, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { EditarPerfilParams } from "../../@types/usuario.type"
import { api } from "../../common/api/config"
import { editarInfoPessoalFormData, editarInfoPessoalSchema } from "./schema/editarInfoPessoal.schema"

const EditarInfosPessoais = ({ updatedAt, userID, atualizarDados, fecharModal, enableSystemMessage }: EditarPerfilParams) => {
  const atualizadoEm = new Date(updatedAt)
  const [modalOpen, setModalOpen] = useState(true)
  const [sendData, setSendData] = useState<{ email: boolean, nome_completo: boolean }>({
    email: false, nome_completo: false
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<editarInfoPessoalFormData>({
    resolver: zodResolver(editarInfoPessoalSchema)
  })

  const onSubmit: SubmitHandler<editarInfoPessoalFormData> = async (data) => {
    if (
      (sendData.email && (!data.email || data.email === '')) ||
      (sendData.nome_completo && (!data.nome_completo || data.nome_completo === ''))
    ) {
      enableSystemMessage("O(s) campo(s) não pode(m) estar vazio(s).", 'error', 3100, 3000)
      return
    }

    if (!sendData.email && !sendData.nome_completo) {
      enableSystemMessage("É necessário preencher algum campo para atualizar os dados", "error", 3100, 3000)
      return
    }

    let email, nome_completo, senha;
    senha = data.senha
    if (sendData.email) email = data.email
    if (sendData.nome_completo) nome_completo = data.nome_completo

    api.patch(`/users/${userID}/perfil/informacaoPessoal`, { email, nome_completo, senha })
      .then((res) => {
        console.log(res)
        enableSystemMessage("Dados atualizados com sucesso!", 'success')
        atualizarDados()
        fecharModal()
      })
      .catch((err) => {
        console.log(err)
        enableSystemMessage(!!err.response.data.message ? err.response.data.message : "Houve uma falha em atualizar os dados", 'error')
        atualizarDados()
        fecharModal()
      })
  }

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        fecharModal()
        setModalOpen(false)
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "maxContent",
        alignItems: "center"
      }}
    >
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
            <Typography variant="body2">Prove que é você</Typography>
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              color="secondary"
              {...register('senha')}
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />
            <Divider />
            <Typography variant="body2">Informação(ões) a ser(em) atualizada(s).</Typography>
            <Grid container gap={2} maxWidth={"600px"}>
              <Grid item display={"flex"} gap={1} md={12} xs={12} lg={12}>
                <TextField
                  label="Nome Completo"
                  type="text"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  {...register('nome_completo')}
                  error={!!errors.nome_completo}
                  helperText={errors.nome_completo?.message}
                />
                <Checkbox
                  checked={sendData.nome_completo}
                  color="secondary"
                  onChange={() => setSendData({ ...sendData, nome_completo: !sendData.nome_completo })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
              <Grid item display={"flex"} gap={1} md={12} xs={12} lg={12}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <Checkbox
                  checked={sendData.email}
                  color="secondary"
                  onChange={() => setSendData({ ...sendData, email: !sendData.email })}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </Grid>
            </Grid>
            <Grid container item display={"flex"} justifyContent={"right"}>
              <Button color="secondary" type="submit" variant="contained">Atualizar</Button>
            </Grid>
          </CardContent>
        </Card >
      </form >
    </Modal>
  )
}
export default EditarInfosPessoais