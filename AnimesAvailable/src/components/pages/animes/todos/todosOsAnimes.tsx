import { Grid } from "@mui/material";
import Anime from "../../../Anime";
import Catalogo from "../../../Catalogo";
import { Base } from "../../elementoHTMLEstatico";
import './todosOsAnimes.css';

interface AnimeInterface {
  id: number;
  nome: string;
  uri: string;
  alt: string;
}

const listaAnimes: Array<AnimeInterface> = [{
  id: 1,
  nome: "To Aru",
  uri: "/images/animes/toaruSeries1.jpg",
  alt: "anime em que o Touma é o protagonista"
}, {
  id: 2,
  nome: "Toaru no Raiugun",
  uri: "/images/animes/toaruSeries2.jpg",
  alt: "anime em que a Misaka é a protagonista"
}, {
  id: 3,
  nome: "Toaru no Accelerator",
  uri: "/images/animes/toaruSeries3.jpg",
  alt: "anime em que o Accelerator é o protagonista"
}, {
  id: 4,
  nome: "Arifureta",
  uri: "/images/animes/arifuretaSeries.jpg",
  alt: "anime em que o Hajime é o protagonista"
}, {
  id: 5,
  nome: "Arifureta",
  uri: "/images/animes/arifuretaSeries.jpg",
  alt: "anime em que o Hajime é o protagonista"
}, {
  id: 6,
  nome: "Arifureta",
  uri: "/images/animes/arifuretaSeries.jpg",
  alt: "anime em que o Hajime é o protagonista"
}, {
  id: 7,
  nome: "Toaru no Raiugun",
  uri: "/images/animes/toaruSeries2.jpg",
  alt: "anime em que a Misaka é a protagonista"
}, {
  id: 8,
  nome: "Toaru no Accelerator",
  uri: "/images/animes/toaruSeries3.jpg",
  alt: "anime em que o Accelerator é o protagonista"
},]

const CatalogoGeral = () => {
  return (
    <Base>
      <Catalogo>
        {listaAnimes.map((anime) => {
          return (
            <Grid key={anime.id} container item xs={4} sm={3} md={2} lg={2} xl={2}>
              <Anime anime={anime} />
            </Grid>)
        })}
      </Catalogo>
    </Base>
  )
}

export default CatalogoGeral