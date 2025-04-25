import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';
import Cart from '../components/Cart';

const mockItem = {
  name: "Sushi Variado",
  description: "Selección de 12 piezas de sushi variado",
  price: "18.00",
  quantity: 1
};

// Mock del useCart
jest.mock('../context/CartContext', () => {
  const actualContext = jest.requireActual('../context/CartContext');
  return {
    ...actualContext,
    useCart: jest.fn(),
  };
});

// Mock window.open
const mockOpen = jest.fn();
window.open = mockOpen;

describe('Cart Component', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReset();
    mockOpen.mockReset();
  });

  const openCart = () => {
    const cartButton = screen.getByTestId('ShoppingCartIcon').closest('button');
    if (cartButton) {
      fireEvent.click(cartButton);
    }
  };

  it('renders empty cart message when no items', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [],
      total: 0,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    expect(screen.getByText(/El carrito está vacío/i)).toBeInTheDocument();
  });

  it('shows correct total with items', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    expect(screen.getByText(/Total: €18.00/)).toBeInTheDocument();
  });

  it('handles remove item click', () => {
    const mockRemoveItem = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      removeItem: mockRemoveItem,
      updateQuantity: jest.fn(),
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    const removeButton = screen.getByTestId('delete-button');
    fireEvent.click(removeButton);
    expect(mockRemoveItem).toHaveBeenCalledWith(mockItem.name);
  });

  it('handles quantity increase', () => {
    const mockUpdateQuantity = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      removeItem: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    const increaseButton = screen.getByTestId('increase-quantity');
    fireEvent.click(increaseButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.name, 2);
  });

  it('handles quantity decrease', () => {
    const mockUpdateQuantity = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [{ ...mockItem, quantity: 2 }],
      total: 36,
      removeItem: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    const decreaseButton = screen.getByTestId('decrease-quantity');
    fireEvent.click(decreaseButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.name, 1);
  });

  it('prevents quantity from going below 0', () => {
    const mockUpdateQuantity = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [{ ...mockItem, quantity: 1 }],
      total: 18,
      removeItem: jest.fn(),
      updateQuantity: mockUpdateQuantity,
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    const decreaseButton = screen.getByTestId('decrease-quantity');
    fireEvent.click(decreaseButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(mockItem.name, 0);
  });

  it('opens checkout dialog when clicking WhatsApp button', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    const whatsappButton = screen.getByText('Pedir por WhatsApp');
    fireEvent.click(whatsappButton);
    expect(screen.getByText('Información de Entrega')).toBeInTheDocument();
  });

  it('handles customer info form submission', () => {
    const mockClearCart = jest.fn();
    const mockSetIsCartOpen = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      clearCart: mockClearCart
    });

    render(<Cart />);
    openCart();
    
    // Open checkout dialog
    fireEvent.click(screen.getByText('Pedir por WhatsApp'));

    // Fill in customer information
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Dirección'), { target: { value: 'Calle 123' } });
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '666777888' } });

    // Submit form
    fireEvent.click(screen.getByText('Confirmar Pedido'));

    // Verify WhatsApp link was opened with encoded parameters
    expect(mockOpen).toHaveBeenCalled();
    const whatsappUrl = decodeURIComponent(mockOpen.mock.calls[0][0]);
    expect(whatsappUrl).toContain('wa.me/34666666666');
    expect(whatsappUrl).toContain('John Doe');
    expect(whatsappUrl).toContain('Calle 123');
    expect(whatsappUrl).toContain('666777888');
    expect(whatsappUrl).toContain('Sushi Variado');
    expect(whatsappUrl).toContain('18.00');

    // Verify cart was cleared and closed
    expect(mockClearCart).toHaveBeenCalled();
    expect(mockSetIsCartOpen).toHaveBeenCalledWith(false);
  });

  it('disables confirm button when form is incomplete', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      isCartOpen: true,
      setIsCartOpen: jest.fn(),
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    
    // Open checkout dialog
    fireEvent.click(screen.getByText('Pedir por WhatsApp'));

    // Confirm button should be disabled initially
    expect(screen.getByText('Confirmar Pedido')).toBeDisabled();

    // Fill in partial information
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'John Doe' } });
    expect(screen.getByText('Confirmar Pedido')).toBeDisabled();

    // Fill in remaining information
    fireEvent.change(screen.getByLabelText('Dirección'), { target: { value: 'Calle 123' } });
    fireEvent.change(screen.getByLabelText('Teléfono'), { target: { value: '666777888' } });

    // Now the button should be enabled
    expect(screen.getByText('Confirmar Pedido')).not.toBeDisabled();
  });

  it('closes checkout dialog when clicking cancel', async () => {
    const mockSetIsCartOpen = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      isCartOpen: true,
      setIsCartOpen: mockSetIsCartOpen,
      clearCart: jest.fn()
    });

    render(<Cart />);
    openCart();
    
    // Open checkout dialog
    fireEvent.click(screen.getByText('Pedir por WhatsApp'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Click cancel and wait for dialog to unmount
    fireEvent.click(screen.getByText('Cancelar'));
    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  });
});