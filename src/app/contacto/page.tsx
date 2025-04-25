'use client';

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Navbar from '../components/Navbar';

export default function ContactoPage() {
  // Coordenadas del restaurante (ejemplo)
  const location = {
    lat: 40.416775,
    lng: -3.703790
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/34666666666', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@osaka-sushi.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+34666666666';
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            mb: 6,
            fontFamily: 'var(--font-playfair)',
          }}
        >
          Contacta con Nosotros
        </Typography>

        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ 
              fontFamily: 'var(--font-playfair)',
              mb: 3
            }}
          >
            ¿Te gustaría reservar una mesa o tienes alguna pregunta?
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            paragraph
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            En Osaka Sushi Lounge nos encanta atender a nuestros clientes. Ya sea para una reserva especial, 
            una celebración o cualquier consulta que tengas, estamos aquí para ayudarte. No dudes en 
            contactarnos por cualquiera de nuestros canales de comunicación.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontFamily: 'var(--font-playfair)' }}>
                  Información de Contacto
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationOnIcon color="primary" />
                    <Typography>
                      Calle Principal 123, Ciudad
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <PhoneIcon color="primary" />
                    <Button 
                      onClick={handlePhoneClick}
                      sx={{ textTransform: 'none' }}
                    >
                      +34 666 666 666
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <WhatsAppIcon color="primary" />
                    <Button 
                      onClick={handleWhatsAppClick}
                      sx={{ textTransform: 'none' }}
                    >
                      Mensaje por WhatsApp
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <EmailIcon color="primary" />
                    <Button 
                      onClick={handleEmailClick}
                      sx={{ textTransform: 'none' }}
                    >
                      info@osaka-sushi.com
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccessTimeIcon color="primary" />
                    <Box>
                      <Typography>Horario:</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lunes a Domingo: 12:00 - 23:00
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                height: '100%',
                minHeight: '400px',
                overflow: 'hidden'
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6357128245366!2d-3.7059723!3d40.4167754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d6da3df33%3A0x6d6d531004e3d0!2sPuerta%20del%20Sol%2C%20Madrid!5e0!3m2!1ses!2ses!4v1650000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Paper>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontFamily: 'var(--font-playfair)' }}>
            ¿Una ocasión especial?
          </Typography>
          <Typography paragraph>
            Para eventos privados, celebraciones o grandes grupos, contáctanos directamente 
            por teléfono o WhatsApp. Estaremos encantados de ayudarte a organizar tu evento especial.
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleWhatsAppClick}
            startIcon={<WhatsAppIcon />}
            sx={{ mt: 2 }}
          >
            Contactar por WhatsApp
          </Button>
        </Box>
      </Container>
    </>
  );
}