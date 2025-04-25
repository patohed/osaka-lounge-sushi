'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'black',
        color: 'white',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Información de la empresa */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'var(--font-playfair)' }}>
              OSAKA
            </Typography>
            <Typography variant="body2" paragraph>
              Experiencia culinaria japonesa auténtica en el corazón de la ciudad.
            </Typography>
            <Typography variant="caption" color="grey.500">
              © {currentYear} pmdevops. Todos los derechos reservados.
            </Typography>
          </Grid>

          {/* Contacto */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">
                  Calle Principal 123, Ciudad
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">
                  +34 666 666 666
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Link href="mailto:info@osaka-sushi.com" color="inherit" underline="hover">
                  info@osaka-sushi.com
                </Link>
              </Box>
            </Box>
          </Grid>

          {/* Enlaces útiles */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Enlaces Útiles
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/menu" color="inherit" underline="hover">
                Menú
              </Link>
              <Link href="/checkout" color="inherit" underline="hover">
                Carrito
              </Link>
              <Link href="/contacto" color="inherit" underline="hover">
                Contacto
              </Link>
              <Link href="/politica-privacidad" color="inherit" underline="hover">
                Política de Privacidad
              </Link>
              <Link href="/terminos-condiciones" color="inherit" underline="hover">
                Términos y Condiciones
              </Link>
            </Box>
          </Grid>

          {/* Redes Sociales */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                color="inherit"
                sx={{ '&:hover': { color: '#1877f2' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                color="inherit"
                sx={{ '&:hover': { color: '#e4405f' } }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                color="inherit"
                sx={{ '&:hover': { color: '#1da1f2' } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                href="https://wa.me/34666666666"
                target="_blank"
                color="inherit"
                sx={{ '&:hover': { color: '#25d366' } }}
              >
                <WhatsAppIcon />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="grey.500">
                Horario de Atención:
              </Typography>
              <Typography variant="body2">
                Lunes a Domingo: 12:00 - 23:00
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'grey.800' }} />
        
        <Typography variant="body2" color="grey.500" align="center">
          Desarrollado por pmdevops • {currentYear} • Todos los derechos reservados
        </Typography>
      </Container>
    </Box>
  );
}