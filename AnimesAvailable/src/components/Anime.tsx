import { Typography } from "@mui/material";

interface Anime {
  id: number;
  nome: string;
  uri: string;
  alt: string;
  lancamento?: string;
  descricao?: string;
  assistirEm?: string[];
  nota?: number
}

interface AnimeParam {
  anime: Anime;
}

const animeStyle: React.CSSProperties = {
  width: '190px',
  height: '270px',
  objectFit: 'cover', //manter a proporção da imagem e ajustando para cobrir toda a área
  objectPosition: 'center', //centralizar a imagem
  overflow: 'hidden' //Garante que qualquer parte da imagem que ultrapasse os limites do contêiner seja cortada e não exibida
}

const Anime = ({ anime }: AnimeParam) => {
  return (
    <div id="cardAnime">
      <div id="info">
        <Typography variant="body2" textAlign={"center"}>{anime.nome}</Typography>
        <Typography variant="body2" textAlign={"center"}>{anime.nota}</Typography>
      </div>
      <img
        style={animeStyle}
        src={anime.uri}
        alt={anime.alt}
      />
    </div>
  )
}

export default Anime