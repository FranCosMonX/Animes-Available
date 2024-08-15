interface Anime {
  id: number,
  nome: string,
  uri: string,
  alt: string
}

interface AnimeParam {
  anime: Anime;
}

const animeStyle: React.CSSProperties | undefined = {
  width: '190px',
  height: '270px',
  objectFit: 'cover', //manter a proporção da imagem e ajustando para cobrir toda a área
  objectPosition: 'center', //centralizar a imagem
  overflow: 'hidden' //Garante que qualquer parte da imagem que ultrapasse os limites do contêiner seja cortada e não exibida
}

const Anime = ({ anime }: AnimeParam) => {
  return (
    <img
      style={animeStyle}
      src={anime.uri}
      alt={anime.alt}
    />
  )
}

export default Anime