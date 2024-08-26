import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { editarPerfilFormData, editarPerfilSchema } from "./schema/editarPerfil.schema";

interface EditarPerfilParams {
  updatedAt: Date
}

export default function EditarPerfil({ updatedAt }: EditarPerfilParams) {
  const atualizadoEm = new Date(updatedAt)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<editarPerfilFormData>({
    resolver: zodResolver(editarPerfilSchema)
  })

  const onSubmit: SubmitHandler<editarPerfilFormData> = async (data) => {
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
          <Typography variant="body2">Informação(ões) a ser(em) atualizada(s).</Typography>
          <TextField
            label="Usuário"
            type="text"
            variant="outlined"
            color="secondary"
            {...register('usuario')}
            error={!!errors.usuario}
            helperText={errors.usuario?.message}
          />
          <TextField
            label="Jogo Preferido"
            type="text"
            variant="outlined"
            color="secondary"
            {...register('jogo_preferido')}
            error={!!errors.jogo_preferido}
            helperText={errors.jogo_preferido?.message}
          />
          <TextField
            label="Anime Preferido"
            type="text"
            variant="outlined"
            color="secondary"
            {...register('anime_preferido')}
            error={!!errors.anime_preferido}
            helperText={errors.anime_preferido?.message}
          />
          <TextField
            label="Hobby"
            type="text"
            variant="outlined"
            color="secondary"
            {...register('hobby')}
            error={!!errors.hobby}
            helperText={errors.hobby?.message}
          />
          <Grid container item display={"flex"} justifyContent={"right"}>
            <Button color="secondary" type="submit" variant="contained">Atualizar</Button>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}