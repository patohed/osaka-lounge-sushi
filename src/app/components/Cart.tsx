'use client';

import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart, isCartOpen, setIsCartOpen } = useCart();
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const handleCheckout = () => {
    // Format the order message for WhatsApp
    const orderItems = items
      .map(item => `${item.quantity}x ${item.name} - €${(parseFloat(item.price) * item.quantity).toFixed(2)}`)
      .join('\n');

    const message = `¡Nuevo pedido!\n\n` +
      `Cliente: ${customerInfo.name}\n` +
      `Dirección: ${customerInfo.address}\n` +
      `Teléfono: ${customerInfo.phone}\n\n` +
      `Pedido:\n${orderItems}\n\n` +
      `Total: €${total.toFixed(2)}`;

    // Format the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = '34666666666'; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new window
    window.open(whatsappUrl, '_blank');

    // Clear the cart and close dialogs
    clearCart();
    setCheckoutDialogOpen(false);
    setIsCartOpen(false);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => setIsCartOpen(true)}
        sx={{ color: 'black' }}
      >
        <Badge badgeContent={items.length} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      >
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Carrito de Compra
          </Typography>

          {items.length === 0 ? (
            <Typography color="text.secondary">
              El carrito está vacío
            </Typography>
          ) : (
            <>
              <List>
                {items.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      border: '1px solid #eee',
                      borderRadius: 1,
                      mb: 1,
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                      <ListItemText
                        primary={item.name}
                        secondary={`€${item.price}`}
                      />
                      <IconButton
                        data-testid="delete-button"
                        size="small"
                        onClick={() => removeItem(item.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        data-testid="decrease-quantity"
                        size="small"
                        onClick={() => updateQuantity(item.name, Math.max(0, item.quantity - 1))}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton
                        data-testid="increase-quantity"
                        size="small"
                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                      <Typography sx={{ ml: 'auto' }}>
                        €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 2, borderTop: '1px solid #eee', pt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Total: €{total.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<WhatsAppIcon />}
                  onClick={() => setCheckoutDialogOpen(true)}
                  sx={{ mt: 2 }}
                >
                  Pedir por WhatsApp
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>

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
    </>
  );
}