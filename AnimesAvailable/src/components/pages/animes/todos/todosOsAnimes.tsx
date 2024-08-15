import Catalogo from "../../../Catalogo";
import { Base } from "../../elementoHTMLEstatico";
import './todosOsAnimes.css';

interface AnimeInterface {
  id: number;
  nome: string;
  uri: string;
  alt: string;
  lancamento?: string;
  descricao?: string;
  assistirEm?: string[];
  nota?: number
}

const listaAnimes: Array<AnimeInterface> = [{
  id: 1,
  nome: "To Aru",
  uri: "/images/animes/toaruSeries1.jpg",
  alt: "anime em que o Touma é o protagonista",
  nota: 10
}, {
  id: 2,
  nome: "Toaru no Raiugun",
  uri: "/images/animes/toaruSeries2.jpg",
  alt: "anime em que a Misaka é a protagonista",
  nota: 10
}, {
  id: 3,
  nome: "Toaru no Accelerator",
  uri: "/images/animes/toaruSeries3.jpg",
  alt: "anime em que o Accelerator é o protagonista",
  nota: 10
}, {
  id: 4,
  nome: "Arifureta",
  uri: "/images/animes/arifuretaSeries.jpg",
  alt: "anime em que o Hajime é o protagonista",
  nota: 10
}, {
  id: 5,
  nome: "Arifureta",
  uri: "/images/animes/arifuretaSeries.jpg",
  alt: "anime em que o Hajime é o protagonista",
  nota: 10
}, {
  id: 6,
  nome: "Arifureta",
  uri: "/images/animes/arifuretaSeries.jpg",
  alt: "anime em que o Hajime é o protagonista",
  nota: 10
}, {
  id: 7,
  nome: "Toaru no Raiugun",
  uri: "/images/animes/toaruSeries2.jpg",
  alt: "anime em que a Misaka é a protagonista",
  nota: 10
}, {
  id: 8,
  nome: "Toaru no Accelerator",
  uri: "/images/animes/toaruSeries3.jpg",
  alt: "anime em que o Accelerator é o protagonista",
  nota: 10
},]

const CatalogoGeral = () => {
  return (
    <Base>
      <Catalogo listaAnimes={listaAnimes} />
    </Base>
  )
}

export default CatalogoGeral