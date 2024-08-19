import { Grid, Typography } from '@mui/material'
import imagemAnimes from '../../../assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { Base, Footer } from '../elementoHTMLEstatico'

const Inicio = () => {
  return (
    <Base>
      <Grid container item
        position={'relative'}
        className='main'
      >
        <img
          className='img-inicio-logout'
          src={imagemAnimes}
          alt="Imagem contendo alguns atores em filmes de ação encontradas na plataforma da netflix"
        />
        <Typography
          position={'absolute'}
          variant='h1'
          fontWeight={"bold"}
          sx={{
            fontSize: '2.5em',
            top: '30%',
            right: '7%'
          }}
        >Avalie seus animes favoritos</Typography>
      </Grid>
      <Footer />
    </Base>
  )
}

export default Inicio