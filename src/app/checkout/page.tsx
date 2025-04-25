'use client';

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function CheckoutPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const router = useRouter();
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar el pedido? Se eliminará todo el contenido del carrito.')) {
      clearCart();
      router.push('/menu');
    }
  };

  const handleAddMore = () => {
    router.push('/menu');
  };

  const handleFinalize = () => {
    setCheckoutDialogOpen(true);
  };

  const handleCheckout = () => {
    const orderItems = items
      .map(item => `${item.quantity}x ${item.name} - €${(parseFloat(item.price) * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = `¡Nuevo pedido!\n\n` +
      `Cliente: ${customerInfo.name}\n` +
      `Dirección: ${customerInfo.address}\n` +
      `Teléfono: ${customerInfo.phone}\n\n` +
      `Pedido:\n${orderItems}\n\n` +
      `Total: €${total.toFixed(2)}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '34666666666'; // Reemplazar con el número real
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    clearCart();
    setCheckoutDialogOpen(false);
    router.push('/menu');
  };

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Tu carrito está vacío
            </Typography>
            <Typography color="text.secondary" paragraph>
              ¿Qué tal si agregas algunos de nuestros deliciosos platos?
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push('/menu')}
              sx={{ mt: 2 }}
            >
              Ver Menú
            </Button>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 8, mt: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Tu Pedido
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
          <TableContainer component={Paper} sx={{ flex: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Producto</TableCell>
                  <TableCell align="center">Cantidad</TableCell>
                  <TableCell align="right">Precio</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1">{item.name}</Typography>
                      {item.description && (
                        <Typography variant="caption" color="text.secondary" display="block">
                          {item.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">€{item.price}</TableCell>
                    <TableCell align="right">
                      €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => removeItem(item.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Card sx={{ flex: 1, p: 3, height: 'fit-content' }}>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>€{total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  €{total.toFixed(2)}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleFinalize}
                startIcon={<WhatsAppIcon />}
              >
                Finalizar Pedido
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleAddMore}
                startIcon={<AddIcon />}
              >
                Agregar Más Productos
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={handleCancel}
                startIcon={<DeleteIcon />}
              >
                Cancelar Pedido
              </Button>
            </Box>
          </Card>
        </Box>

        <Dialog
          open={checkoutDialogOpen}
          onClose={() => setCheckoutDialogOpen(false)}
        >
          <DialogTitle>Información de Entrega</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              value={customerInfo.name}
              onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Dirección"
              fullWidth
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Teléfono"
              fullWidth
              value={customerInfo.phone}
              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCheckoutDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCheckout}
              variant="contained"
              disabled={!customerInfo.name || !customerInfo.address || !customerInfo.phone}
            >
              Confirmar Pedido
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}