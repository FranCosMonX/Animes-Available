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
        <Button><Typography>Avaliador de Filmes</Typography></Button>
      </Grid>
      <Grid item display={"flex"} gap={2}>
        <Button>CADASTRAR</Button>
        <Button>LOGIN</Button>
      </Grid>
    </Grid>
  )
}

export const Footer = () => {
  return (
    <Grid container item
      display={"flex"}
      gap={1}
      sx={{ padding: "5px 20px" }}
      className="footer"
    >
      <p>Este site o resultado para uma atividade proposta pela talentos Cloud.</p>
      <p>Desenvolvido por Francisco Xavier.</p>
    </Grid>
  )
}