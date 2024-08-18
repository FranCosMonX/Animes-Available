import { Button, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { Base } from "../../elementoHTMLEstatico";

export default function Perfil() {
  return (
    <Base>
      <Card sx={{ background: 'none', width: '90%', margin: '25px' }}>
        <CardContent>
          <Typography color={'primary'} textAlign={'center'} variant="h4">INFORMAÇÕES DE USUÁRIO</Typography>
          <Grid container display={'flex'} flexDirection={'column'} gap={1} marginTop={2}>
            <Grid item>
              <Typography color={'primary'}>Nome de usuario</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Jogo preferido</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Anime preferido</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Hobby</Typography>
            </Grid>
            <Divider sx={{ backgroundColor: 'white' }} />
            <Grid item>
              <Typography color={'primary'}>Nome Completo</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Email</Typography>
            </Grid>
            <Grid item>
              <Typography color={'primary'}>Senha</Typography>
            </Grid>
            <Grid item display={'flex'} gap={2} justifyContent={'center'}>
              <Button color="secondary" variant="contained" type="button">Editar Perfil</Button>
              <Button color="secondary" variant="contained" type="button">Editar credenciais</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Base>
  )
}