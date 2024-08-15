import { Button, Grid, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const BaseStyle: React.CSSProperties | undefined = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
}

interface propBase {
  children: ReactNode;
}

export const Header = () => {
  const navigate = useNavigate()

  return (
    <Grid container
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ padding: "5px 20px" }}
    >
      <Grid item>
        <Button type="button" onClick={() => navigate('/')}>
          <Typography fontWeight={"bold"}>Avaliador de Filmes</Typography>
        </Button>
      </Grid>
      <Grid item display={"flex"} gap={2}>
        <Button color="secondary" variant="contained" onClick={() => navigate('/cadastro')}>CADASTRAR</Button>
        <Button color="secondary" variant="contained" onClick={() => navigate('/login')}> LOGIN</Button>
      </Grid>
    </Grid >
  )
}

export const Footer = () => {
  return (
    <Grid container item
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      sx={{ padding: "10px 20px" }}
      className="footer"
    >
      <p>Este site o resultado para uma atividade proposta pela talentos Cloud.</p>
      <p>Desenvolvido por Francisco Xavier.</p>
    </Grid>
  )
}

export const Base = ({ children }: propBase) => {
  return (
    <div style={BaseStyle}>
      <Header />
      {children}
    </ div>
  )
}