import { Grid } from '@mui/material'
import './App.css'
import imagemAnimes from './assets/images/Selecta-Visión-Amazon-Prime-Video.jpg'
import { Footer, Header } from './components/elementoHTMLEstatico'

function App() {

  return (
    <>
      <Header />
      <Grid container item
        position={'relative'}
        className='main'
      >
        <h1>Avalie seus filmes favoritos</h1>
        <img
          src={imagemAnimes}
          alt="Imagem contendo alguns atores em filmes de ação encontradas na plataforma da netflix"
        />
      </Grid>
      <Footer />
    </>
  )
}

export default App
