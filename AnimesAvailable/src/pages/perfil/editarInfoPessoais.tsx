import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Typography } from "@mui/material"
import { SubmitHandler, useForm } from "react-hook-form"
import { editarInfoPessoalFormData, editarInfoPessoalSchema } from "./schema/editarInfoPessoal.schema"

interface EditarParams {
  updatedAt: Date
}
export default function EditarInfosPessoais({ updatedAt }: EditarParams) {
  const atualizadoEm = new Date(updatedAt)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<editarInfoPessoalFormData>({
    resolver: zodResolver(editarInfoPessoalSchema)
  })

  const onSubmit: SubmitHandler<editarInfoPessoalFormData> = async (data) => {
    console.log(data)
  }

  return (
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
          <TextField
            label="Nome Completo"
            type="text"
            variant="outlined"
            color="secondary"
            {...register('nome_completo')}
            error={!!errors.nome_completo}
            helperText={errors.nome_completo?.message}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            color="secondary"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Grid container item display={"flex"} justifyContent={"right"}>
            <Button color="secondary" type="submit" variant="contained">Atualizar</Button>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}