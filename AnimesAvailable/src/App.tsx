import './App.css'
import { Footer, Header } from './components/elementoHTMLEstatico'

function App() {

  return (
    <>
      <Header />
      <main>
        <h1>Avalie seus filmes favoritos</h1>

        <img src={"../public/Selecta-Visión-Amazon-Prime-Video.jpg"}
          alt="Imagem contendo alguns atores em filmes de ação encontradas na plataforma da netflix" />
      </main>
      <Footer />
    </>
  )
}

export default App
