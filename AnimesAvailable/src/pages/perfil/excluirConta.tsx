import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Grid, Modal, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { EditarPerfilParams } from "../../@types/usuario.type"
import { api } from "../../common/api/config"
import { useHandleLogout } from "../../common/app/auth"
import { excluirContaFormData, excluirContaSchema } from "./schema/excluirConta"

const ExcluirConta = ({ userID, atualizarDados, fecharModal, enableSystemMessage, createdAt }: EditarPerfilParams & { createdAt: Date }) => {
  const atualizadoEm = new Date(createdAt)
  const handleLogout = useHandleLogout()
  const [modalOpen, setModalOpen] = useState(true)
  const [btnExcluir, setBtnExcluir] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<excluirContaFormData>({
    resolver: zodResolver(excluirContaSchema)
  })

  const onSubmit: SubmitHandler<excluirContaFormData> = async (data) => {
    const senha = data.senha
    api.delete(`/users/${userID}`, { data: { senha } })
      .then(() => {
        enableSystemMessage("Dados atualizados com sucesso!", 'success', 3100, 3000)
        setTimeout(() => {
          fecharModal()
          handleLogout()
        }, 3100)
      })
      .catch((err) => {
        enableSystemMessage(!!err.response.data.message ? err.response.data.message : "Houve uma falha em atualizar os dados", 'error')
        atualizarDados()
        fecharModal()
      })
  }

  const cardContent = () => {
    let component;
    if (!btnExcluir) {
      component = (
        <Grid container item display={'flex'} flexDirection={'column'} width={'100%'} gap={2} alignItems={'center'}>
          <Typography variant="body1">Realmente desejas excluir a conta?</Typography>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => setBtnExcluir(true)}
          >Sim</Button>
        </Grid>
      )
    } else {
      component = (
        <React.Fragment>
          <TextField
            label="Senha"
            type="text"
            variant="outlined"
            color="secondary"
            fullWidth
            {...register('senha')}
            error={!!errors.senha}
            helperText={errors.senha?.message}
          />
          <Grid container item display={'flex'} justifyContent={'right'}>
            <Button
              color="secondary"
              variant="outlined"
              type="submit"
            >Excluir</Button>
          </Grid>
        </React.Fragment>
      )
    }

    return (
      <CardContent
        sx={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        {component}
      </CardContent>
    )
  }

  return (
    <Modal
      open={modalOpen}
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
            title="Excluir Conta"
            subheader={`Criada em ${atualizadoEm}`}
          />
          {cardContent()}
        </Card>
      </form>
    </Modal>
  )
}

export default ExcluirConta