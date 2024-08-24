import { Alert, AlertColor } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

interface MensagemDoSistemaParams {
  mensagem: string;
  tempo_ms: number;
  severityMessage: AlertColor;
}

export default function MensagemDoSistema({ mensagem, tempo_ms, severityMessage }: MensagemDoSistemaParams) {
  const [msgSistemaInicializado, setMsgSistemaInicializado] = React.useState(false)
  const [openMsgSistemaInicializado, setOpenMsgSistemaInicializado] = React.useState(true)
  React.useEffect(() => {
    if (!msgSistemaInicializado) {
      setTimeout(() => {
        setOpenMsgSistemaInicializado(false)
      }, tempo_ms)
      setMsgSistemaInicializado(true)
    }
  }, [msgSistemaInicializado])

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openMsgSistemaInicializado}
      >
        <Alert severity={severityMessage} sx={{ width: '100%' }}>
          {mensagem}
        </Alert>
      </Snackbar>
    </Box>
  );
}