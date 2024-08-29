import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Divider, Grid, Modal, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { EditarPerfilParams } from "../../@types/usuario.type"
import { api } from "../../common/api/config"
import { alterarSenhaFormData, alterarSenhaSchema } from "./schema/alterarSenha.schema"

const AlterarSenha = ({ updatedAt, userID, atualizarDados, fecharModal, enableSystemMessage }: EditarPerfilParams & { updatedAt: Date }) => {
  const atualizadoEm = new Date(updatedAt)
  const [modalOpen, setModalOpen] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<alterarSenhaFormData>({
    resolver: zodResolver(alterarSenhaSchema)
  })

  const onSubmit: SubmitHandler<alterarSenhaFormData> = async (data) => {
    const { senha, nova_senha } = data
    api.patch(`/users/${userID}/perfil/Senha`, { senha, nova_senha })
      .then(() => {
        enableSystemMessage("Dados atualizados com sucesso!", 'success')
        atualizarDados()
        fecharModal()
      })
      .catch((err) => {
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
            Informação a ser atualizada.
            <TextField
              label="Nova Senha"
              type="password"
              variant="outlined"
              color="secondary"
              {...register('nova_senha')}
              error={!!errors.nova_senha}
              helperText={errors.nova_senha?.message}
            />
            <TextField
              label="Repetir senha"
              type="password"
              variant="outlined"
              color="secondary"
              {...register('repetir_senha')}
              error={!!errors.repetir_senha}
              helperText={errors.repetir_senha?.message}
            />
            <Grid container item display={"flex"} justifyContent={"right"}>
              <Button color="secondary" type="submit" variant="contained">Atualizar</Button>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Modal>
  )
}

export default AlterarSenha