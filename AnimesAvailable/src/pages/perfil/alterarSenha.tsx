import { Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"

interface EditarParams {
  updatedAt: Date
}

export default function AlterarSenha({ updatedAt }: EditarParams) {
  const atualizadoEm = new Date(updatedAt)

  const handleSubmit = () => {

  }

  return (
    <form onSubmit={handleSubmit} className="form_popup">
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
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            color="secondary"
          />
          <TextField
            label="Nova Senha"
            type="password"
            variant="outlined"
            color="secondary"
          />
          <TextField
            label="Repetir senha"
            type="password"
            variant="outlined"
            color="secondary"
          />
          <Grid container item display={"flex"} justifyContent={"right"}>
            <Button color="secondary" type="submit" variant="contained">Atualizar</Button>
          </Grid>
        </CardContent>
      </Card>
    </form>
  )
}