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

const Anime = ({ anime }: AnimeParam) => {
  return (
    <div id="cardAnime">
      <div id="info">
        <Typography variant="body2" textAlign={"center"}>{anime.nome}</Typography>
        <Typography variant="body2" textAlign={"center"}>{anime.nota}</Typography>
      </div>
      <img
        src={anime.uri}
        alt={anime.alt}
      />
    </div>
  )
}

export default Anime