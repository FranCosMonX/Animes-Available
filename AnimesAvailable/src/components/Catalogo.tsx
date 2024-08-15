import { Card, Grid } from "@mui/material";
import Anime from "./Anime";

interface AnimeInterface {
  id: number;
  nome: string;
  uri: string;
  alt: string;
}

interface CatalogoParams {
  listaAnimes: AnimeInterface[];
}

/**
 * 
 * @param anime : Grid item (MaterialUI) contendo um padrão para detalhar um anime 
 * @returns 
 */
const Catalogo = ({ listaAnimes }: CatalogoParams) => {
  return (
    <Card
      elevation={0}
      sx={{
        background: 'none',
        border: '0',
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
        flexWrap: 'wrap',
        width: '95%',
        marginTop: '15px'
      }}
    >
      {listaAnimes.map((anime) => {
        return (
          <Grid key={anime.id} container item xs={4} sm={3} md={2} lg={2} xl={2}>
            <Anime anime={anime} />
          </Grid>
        )
      })}
    </Card>
  )
}

export default Catalogo