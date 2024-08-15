import { Button, Grid, Typography } from "@mui/material"

export const Header = () => {
  return (
    <Grid container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ padding: "5px 20px" }}
    >
      <Grid item>
        <Typography>Avaliador de Filmes</Typography>
      </Grid>
      <Grid item display={"flex"} gap={2}>
        <Button>CADASTRAR</Button>
        <Button>LOGIN</Button>
      </Grid>
    </Grid>
  )
}