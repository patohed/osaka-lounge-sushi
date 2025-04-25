import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

describe('Navbar Component', () => {
  const renderWithProvider = (component: React.ReactNode) => {
    return render(
      <CartProvider>
        {component}
      </CartProvider>
    );
  };

  it('renders the logo', () => {
    renderWithProvider(<Navbar />);
    const logo = screen.getAllByText(/OSAKA/i)[0];
    expect(logo).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProvider(<Navbar />);
    const menuLinks = screen.getAllByRole('button', { name: /menú/i });
    const contactoLink = screen.getByRole('button', { name: /contacto/i });
    expect(menuLinks[0]).toBeInTheDocument();
    expect(contactoLink).toBeInTheDocument();
  });

  it('shows cart icon', () => {
    renderWithProvider(<Navbar />);
    const cartIcons = screen.getAllByTestId('ShoppingCartIcon');
    expect(cartIcons[0]).toBeInTheDocument();
  });

  it('responds to mobile menu button click', () => {
    renderWithProvider(<Navbar />);
    const menuIcon = screen.getByTestId('MenuIcon');
    const menuButton = menuIcon.closest('button');
    expect(menuButton).toBeInTheDocument();
    
    if (menuButton) {
      fireEvent.click(menuButton);
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems.length).toBeGreaterThan(0);
      expect(menuItems[0]).toBeVisible();
    }
  });
});