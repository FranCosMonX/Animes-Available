import { CircularProgress, Grid, Typography } from "@mui/material";

const CircularLoading = () => {
  return (
    <Grid container item display={'flex'} justifyContent={'center'} alignItems={'center'} gap={3}>
      <CircularProgress color={'secondary'} />
      <Typography variant='body1'>Carregando</Typography>
    </Grid>
  )
}

export default CircularLoading;