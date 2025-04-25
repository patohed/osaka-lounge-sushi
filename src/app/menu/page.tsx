'use client';

import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
  Zoom,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const menuItems = [
  {
    name: "Sushi Variado",
    description: "Selección de 12 piezas de sushi variado",
    price: "18.00",
    image: "/images/sushi-variado.jpg"
  },
  {
    name: "Nigiri Salmón",
    description: "4 piezas de nigiri de salmón fresco",
    price: "8.50",
    image: "/images/nigiri-salmon.jpg"
  },
  {
    name: "Roll California",
    description: "8 piezas de roll california con cangrejo y aguacate",
    price: "12.00",
    image: "/images/california-roll.jpg"
  },
  {
    name: "Tempura Maki",
    description: "6 piezas de roll tempura con langostino",
    price: "14.00",
    image: "/images/tempura-maki.jpg"
  },
  {
    name: "Sashimi Mix",
    description: "12 cortes variados de sashimi fresco",
    price: "22.00",
    image: "/images/sashimi-mix.jpg"
  },
  {
    name: "Dragon Roll",
    description: "8 piezas de roll especial con anguila y aguacate",
    price: "16.00",
    image: "/images/dragon-roll.jpg"
  }
];

export default function MenuPage() {
  const { addItem } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState('');
  const [clickedItemId, setClickedItemId] = useState<string | null>(null);

  const handleAddItem = (item: any) => {
    setClickedItemId(item.name);
    setTimeout(() => setClickedItemId(null), 500);
    
    addItem(item);
    setLastAddedItem(item.name);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontFamily: 'var(--font-playfair)',
            mb: 6
          }}
        >
          Nuestro Menú
        </Typography>
        
        <Grid container spacing={4}>
          {menuItems.map((item) => (
            <Grid item component={motion.div} 
              key={item.name} 
              xs={12} 
              sm={6} 
              md={4}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  transform: clickedItemId === item.name ? 'scale(0.95)' : 'scale(1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 200,
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontFamily: 'var(--font-playfair)' }}>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    mt: 2,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      €{item.price}
                    </Typography>
                    <Zoom in={true}>
                      <Button 
                        variant="contained"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={() => handleAddItem(item)}
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                          '&:active': {
                            transform: 'scale(0.95)',
                          },
                        }}
                      >
                        Añadir
                      </Button>
                    </Zoom>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          TransitionComponent={Zoom}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="success" 
            variant="filled"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <AddShoppingCartIcon fontSize="small" />
            {lastAddedItem} añadido al carrito
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}