import React from 'react';
import { render, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

const mockItem = {
  name: "Sushi Variado",
  description: "Selección de 12 piezas de sushi variado",
  price: "18.00",
  quantity: 1
};

// Componente de prueba para acceder al contexto
const TestComponent = ({ onContext }: { onContext: Function }) => {
  const context = useCart();
  React.useEffect(() => {
    onContext(context);
  }, [context, onContext]);
  return null;
};

describe('CartContext', () => {
  it('provides initial empty state', () => {
    let contextValue: any;
    render(
      <CartProvider>
        <TestComponent onContext={(value: any) => { contextValue = value; }} />
      </CartProvider>
    );

    expect(contextValue.items).toEqual([]);
    expect(contextValue.total).toBe(0);
  });

  it('adds items correctly', () => {
    let contextValue: any;
    render(
      <CartProvider>
        <TestComponent onContext={(value: any) => { contextValue = value; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addItem(mockItem);
    });

    expect(contextValue.items).toHaveLength(1);
    expect(contextValue.items[0]).toEqual({ ...mockItem });
    expect(contextValue.total).toBe(18);
  });

  it('updates quantity correctly', () => {
    let contextValue: any;
    render(
      <CartProvider>
        <TestComponent onContext={(value: any) => { contextValue = value; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addItem(mockItem);
      contextValue.updateQuantity(mockItem.name, 3);
    });

    expect(contextValue.items[0].quantity).toBe(3);
    expect(contextValue.total).toBe(54);
  });

  it('removes items correctly', () => {
    let contextValue: any;
    render(
      <CartProvider>
        <TestComponent onContext={(value: any) => { contextValue = value; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addItem(mockItem);
      contextValue.removeItem(mockItem.name);
    });

    expect(contextValue.items).toHaveLength(0);
    expect(contextValue.total).toBe(0);
  });

  it('clears cart correctly', () => {
    let contextValue: any;
    render(
      <CartProvider>
        <TestComponent onContext={(value: any) => { contextValue = value; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addItem(mockItem);
      contextValue.clearCart();
    });

    expect(contextValue.items).toHaveLength(0);
    expect(contextValue.total).toBe(0);
  });

  it('prevents adding duplicate items', () => {
    let contextValue: any;
    render(
      <CartProvider>
        <TestComponent onContext={(value: any) => { contextValue = value; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addItem(mockItem);
      contextValue.addItem(mockItem);
    });

    expect(contextValue.items).toHaveLength(1);
    expect(contextValue.items[0].quantity).toBe(2);
  });

  it('handles decimal prices correctly', () => {
    let contextValue: any;
    const itemWithDecimal = { ...mockItem, price: "18.99" };
    
    render(
      <CartProvider>
        <TestComponent onContext={(value: any) => { contextValue = value; }} />
      </CartProvider>
    );

    act(() => {
      contextValue.addItem(itemWithDecimal);
    });

    expect(contextValue.total).toBe(18.99);
  });
});