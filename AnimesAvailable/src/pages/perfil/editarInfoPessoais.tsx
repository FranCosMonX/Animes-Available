import { Button, Card, CardContent, CardHeader, Grid, TextField } from "@mui/material"

interface EditarParams {
  updatedAt: Date
}
export default function EditarInfosPessoais({ updatedAt }: EditarParams) {
  const atualizadoEm = new Date(updatedAt)

  return (
    <form className="form_popup">
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
            label="Nome Completo"
            type="text"
            variant="outlined"
            color="secondary"
          />
          <TextField
            label="Email"
            type="email"
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