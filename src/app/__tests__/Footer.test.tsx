import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock current year to make tests deterministic
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2025, 3, 25));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders company information', () => {
    render(<Footer />);
    expect(screen.getByText('OSAKA')).toBeInTheDocument();
    expect(screen.getByText(/Experiencia culinaria japonesa/)).toBeInTheDocument();
    expect(screen.getByText(/© 2025 pmdevops/)).toBeInTheDocument();
  });

  it('displays contact information', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument();
    expect(screen.getByText('Calle Principal 123, Ciudad')).toBeInTheDocument();
    expect(screen.getByText('+34 666 666 666')).toBeInTheDocument();
    expect(screen.getByText('info@osaka-sushi.com')).toBeInTheDocument();
  });

  it('shows useful links', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'Enlaces Útiles' })).toBeInTheDocument();
    
    const links = [
      { text: 'Menú', href: '/menu' },
      { text: 'Carrito', href: '/checkout' },
      { text: 'Contacto', href: '/contacto' },
      { text: 'Política de Privacidad', href: '/politica-privacidad' },
      { text: 'Términos y Condiciones', href: '/terminos-condiciones' }
    ];

    links.forEach(link => {
      const element = screen.getByRole('link', { name: link.text });
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('href', link.href);
    });
  });

  it('displays social media links', () => {
    render(<Footer />);
    expect(screen.getByRole('heading', { name: 'Síguenos' })).toBeInTheDocument();
    
    const socialUrls = [
      { url: 'https://facebook.com', icon: 'FacebookIcon' },
      { url: 'https://instagram.com', icon: 'InstagramIcon' },
      { url: 'https://twitter.com', icon: 'TwitterIcon' },
      { url: 'https://wa.me/34666666666', icon: 'WhatsAppIcon' }
    ];

    socialUrls.forEach(({ url, icon }) => {
      const link = screen.getByTestId(icon).closest('a');
      expect(link).toHaveAttribute('href', url);
      expect(link).toHaveAttribute('target', '_blank');
    });
  });

  it('shows business hours', () => {
    render(<Footer />);
    expect(screen.getByText('Horario de Atención:')).toBeInTheDocument();
    expect(screen.getByText('Lunes a Domingo: 12:00 - 23:00')).toBeInTheDocument();
  });

  it('displays copyright information', () => {
    render(<Footer />);
    expect(screen.getByText(/Desarrollado por pmdevops • 2025 • Todos los derechos reservados/)).toBeInTheDocument();
  });
});