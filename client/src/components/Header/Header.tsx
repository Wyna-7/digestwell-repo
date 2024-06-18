import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//TODO fix img import
//const logo = require('../../assets/logo-icon.svg') as string;

const pages = [
  { name: 'My lists', path: '/my-lists' },
  { name: 'Info', path: '/info' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState<HTMLButtonElement | null>(null);
  const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const location = useLocation();

  if (location.pathname === '/digestWell') {
    return null;
  }

  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            height: '90px',
          }}
        >
          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              marginRight: '1rem',
              width: '80px',
              height: '80px',
            }}
          >
            <img src={'../../assets/logo-icon.svg'} alt="logo" style={{ width: '100%', height: '100%' }} />
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DigestWell
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.path}
                    textAlign="center"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', sm: 'flex', md: 'none' },
              marginRight: '1rem',
              width: '70px',
              height: '70px',
            }}
          >
            <img src={'../../assets/logo-icon.svg'} alt="logo" style={{ width: '100%', height: '100%' }} />
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            DigestWell
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, width: 60, height: 60 }}>
                <Avatar alt="Mr Beast" src="/profile-picture.png" sx={{ p: 0, width: 60, height: 60 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
