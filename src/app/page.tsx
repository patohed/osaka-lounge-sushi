'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import Navbar from './components/Navbar';

const HeroSection = styled('section')({
  position: 'relative',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  }
});

const ContentSection = styled(Container)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
});

const MinimalistCard = styled(Paper)(({ theme }) => ({
  borderRadius: '16px',
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const CardImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  paddingTop: '66.67%', // 3:2 aspect ratio
  overflow: 'hidden',
});

const CardContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export default function Home() {
  const featuredItems = [
    {
      title: 'Sushi Premium',
      description: 'Selección de nigiri y sashimi de la más alta calidad',
      image: '/next.svg'
    },
    {
      title: 'Rolls Especiales',
      description: 'Creaciones únicas con ingredientes frescos y sabores innovadores',
      image: '/next.svg'
    },
    {
      title: 'Sake Selection',
      description: 'La mejor selección de sake importado de Japón',
      image: '/next.svg'
    }
  ];

  return (
    <Box>
      <Navbar />
      
      <HeroSection>
        <Box sx={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/next.svg"
            alt="Osaka Sushi Lounge - Experiencia culinaria"
            fill
            style={{ objectFit: 'cover', opacity: 0.7 }}
            priority
          />
        </Box>
        <ContentSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 'bold'
              }}
            >
              Osaka Sushi Lounge
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ mb: 4 }}
            >
              Una experiencia gastronómica única
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                href="/menu"
              >
                Ver Menú
              </Button>
              <Button 
                variant="outlined" 
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
                size="large"
                href="/pedido"
              >
                Hacer Pedido
              </Button>
            </Box>
          </motion.div>
        </ContentSection>
      </HeroSection>

      <Container sx={{ py: 10 }}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 6
        }}>
          <Box>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Typography variant="h3" gutterBottom>
                Bienvenidos a Osaka Sushi Lounge
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                Descubre la fusión perfecta entre la tradición japonesa y la innovación culinaria. 
                Nuestros chefs expertos crean obras maestras gastronómicas utilizando los 
                ingredientes más frescos y técnicas tradicionales.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOnIcon color="primary" />
                  <Typography>Calle Principal 123, Ciudad</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PhoneIcon color="primary" />
                  <Typography>+34 123 456 789</Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>
          <Box>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Paper 
                elevation={3}
                sx={{ 
                  position: 'relative',
                  height: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <Image
                  src="/next.svg"
                  alt="Selección de sushi premium"
                  width={300}
                  height={200}
                  style={{ opacity: 0.5 }}
                />
              </Paper>
            </motion.div>
          </Box>
        </Box>
      </Container>

      <Box sx={{ bgcolor: 'grey.50', py: 10 }}>
        <Container>
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom
            sx={{ 
              fontFamily: 'var(--font-playfair)',
              mb: 6
            }}
          >
            Nuestros Destacados
          </Typography>
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}>
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <MinimalistCard elevation={0}>
                  <CardImageContainer>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ 
                        objectFit: 'cover',
                        opacity: 0.9
                      }}
                    />
                  </CardImageContainer>
                  <CardContent>
                    <Typography 
                      variant="h5" 
                      gutterBottom
                      sx={{ 
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 500
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ lineHeight: 1.6 }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </MinimalistCard>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      <Box sx={{ bgcolor: 'black', color: 'white', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom>
            ¿Listo para disfrutar?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'grey.400' }}>
            Haz tu pedido ahora y déjate sorprender por nuestra cocina japonesa de autor
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            href="/pedido"
          >
            Hacer Pedido
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
