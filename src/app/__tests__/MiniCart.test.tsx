import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useCart } from '../context/CartContext';
import MiniCart from '../components/MiniCart';

const mockItem = {
  name: "Sushi Variado",
  description: "Selección de 12 piezas de sushi variado",
  price: "18.00",
  quantity: 1
};

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      push: jest.fn(),
    };
  },
}));

jest.mock('../context/CartContext', () => {
  const actualContext = jest.requireActual('../context/CartContext');
  return {
    ...actualContext,
    useCart: jest.fn(),
  };
});

describe('MiniCart Component', () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReset();
  });

  it('shows empty cart total', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [],
      total: 0,
      setIsCartOpen: jest.fn()
    });

    render(<MiniCart />);
    expect(screen.getByText('€0.00')).toBeInTheDocument();
  });

  it('shows correct total with items', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      setIsCartOpen: jest.fn()
    });

    render(<MiniCart />);
    expect(screen.getByText('€18.00')).toBeInTheDocument();
  });

  it('displays item count in badge', () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      setIsCartOpen: jest.fn()
    });

    render(<MiniCart />);
    const badge = screen.getAllByText('1')[0]; // Get the first badge
    expect(badge).toBeInTheDocument();
    expect(badge.closest('.MuiBadge-badge')).toBeInTheDocument();
  });

  it('navigates to checkout on cart click', () => {
    const mockPush = jest.fn();
    (require('next/navigation') as any).useRouter = () => ({
      push: mockPush
    });
    
    (useCart as jest.Mock).mockReturnValue({
      items: [mockItem],
      total: 18,
      setIsCartOpen: jest.fn()
    });

    render(<MiniCart />);
    // Find the button that contains the price text
    const cartButton = screen.getByText('€18.00').closest('button');
    fireEvent.click(cartButton!);
    expect(mockPush).toHaveBeenCalledWith('/checkout');
  });
});