'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MiniCart from './MiniCart';

const pages = [
  { name: 'Inicio', path: '/' },
  { name: 'Menú', path: '/menu' },
  { name: 'Pedidos', path: '/pedido' },
  { name: 'Contacto', path: '/contacto' }
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={{ 
      backdropFilter: 'blur(10px)', 
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'all 0.3s'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700,
                color: 'black',
                textDecoration: 'none',
                cursor: 'pointer',
                fontSize: '1.5rem'
              }}
            >
              OSAKA
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: 'black' }}
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
                <Link 
                  key={page.name} 
                  href={page.path}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 2,
                  flexGrow: 1,
                  fontFamily: 'var(--font-playfair)',
                  fontWeight: 700,
                  color: 'black',
                  textDecoration: 'none',
                }}
              >
                OSAKA
              </Typography>
            </Link>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {pages.map((page) => (
              <Link 
                key={page.name} 
                href={page.path}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    my: 2, 
                    color: 'black', 
                    display: 'block', 
                    mx: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '0%',
                      height: '2px',
                      bottom: '0',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'primary.main',
                      transition: 'width 0.3s ease-in-out'
                    },
                    '&:hover::after': {
                      width: '100%'
                    }
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <MiniCart />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}