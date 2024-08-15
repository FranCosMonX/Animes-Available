import { Grid } from "@mui/material"
import { ReactNode } from "react"

interface CatalogoParams {
  children: ReactNode
}

/**
 * 
 * @param anime : Grid item (MaterialUI) contendo um padrão para detalhar um anime 
 * @returns 
 */
const Catalogo = ({ children }: CatalogoParams) => {
  return (
    <Grid container gap={1}>
      {children}
    </Grid>
  )
}

export default Catalogo