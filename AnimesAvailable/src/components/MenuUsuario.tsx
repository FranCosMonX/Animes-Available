import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Box, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuUsuarioParams {
  usuario: string;
}

export default function MenuUsuario({ usuario }: MenuUsuarioParams) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('usuario')
    navigate('/')
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Menu do usuário">
          <IconButton
            onClick={handleClick}
            size="medium"
            aria-haspopup="true"
          >
            <Avatar sx={{ width: 32, height: 32 }}>T</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/perfil')}>
          <Grid container display={'flex'} gap={1} alignItems={'center'}>
            <Grid item><Avatar /></Grid>
            <Grid item><Typography>{usuario ? usuario : ""}</Typography></Grid>
          </Grid>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}