import { Grid } from "@mui/material"
import Catalogo from "../../../Catalogo"
import { Base } from "../../elementoHTMLEstatico"
import './todosOsAnimes.css'

const CatalogoGeral = () => {
  return (
    <Base>
      <Catalogo>
        <Grid item md={2}>
          <div>
            <img
              src="/images/animes/toaruSeries1.jpg"
              alt="Imagem contendo alguns atores em filmes de ação encontradas na plataforma da Netflix"
            />
          </div>
        </Grid>

      </Catalogo>
    </Base>
  )
}

export default CatalogoGeral