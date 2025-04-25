'use client';

import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Badge,
  Fade,
  Popper,
  ClickAwayListener,
  Button,
  Divider
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MiniCart() {
  const { items, total, setIsCartOpen } = useCart();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleCheckoutClick = () => {
    setAnchorEl(null);
    router.push('/checkout');
  };

  const open = Boolean(anchorEl);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box
            component="button"
            onClick={handleCheckoutClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: 'primary.main',
              color: 'white',
              py: 1,
              px: 2,
              borderRadius: 2,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            <Badge badgeContent={items.length} color="error">
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="button">
              €{total.toFixed(2)}
            </Typography>
          </Box>
        </motion.div>

        <IconButton
          size="small"
          onClick={handleClick}
          sx={{ ml: -1 }}
        >
          <Badge badgeContent={items.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Popper
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          transition
          sx={{ zIndex: 1400 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  p: 2,
                  mt: 1,
                  minWidth: 300,
                  maxHeight: 400,
                  overflow: 'auto',
                  boxShadow: 3
                }}
              >
                {items.length === 0 ? (
                  <Typography color="text.secondary">
                    El carrito está vacío
                  </Typography>
                ) : (
                  <>
                    {items.map((item) => (
                      <Box
                        key={item.name}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          mb: 1,
                          pb: 1,
                          borderBottom: '1px solid',
                          borderColor: 'divider'
                        }}
                      >
                        <Box>
                          <Typography variant="body2">
                            {item.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.quantity}x €{item.price}
                          </Typography>
                        </Box>
                        <Typography variant="body2">
                          €{(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        pt: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        Total
                      </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        €{total.toFixed(2)}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleCheckoutClick}
                      startIcon={<ShoppingCartIcon />}
                    >
                      Ver Carrito
                    </Button>
                  </>
                )}
              </Paper>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}