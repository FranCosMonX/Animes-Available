import { Alert } from '@mui/material';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import * as React from 'react';
import { MensagemDoSistemaParams } from '../../@types/sistema.type';

const MensagemDoSistema = ({ message, time_ms, severity }: MensagemDoSistemaParams) => {
  const [open, setOpen] = React.useState(true)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box sx={{ width: 300, position: 'relative' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        onClose={handleClose}
        autoHideDuration={time_ms}
      >
        <Alert severity={severity} variant='filled' onClose={handleClose} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default MensagemDoSistema