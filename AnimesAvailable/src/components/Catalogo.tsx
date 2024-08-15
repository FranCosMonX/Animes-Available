import { Card } from "@mui/material"
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
      {children}
    </Card>
  )
}

export default Catalogo