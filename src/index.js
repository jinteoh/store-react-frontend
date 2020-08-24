import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductProvider from './contexts/ProductContext'
import CartProvider from './contexts/CartContext'
import UserProvider from './contexts/UserContext'

ReactDOM.render(
  <ProductProvider>
    <CartProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </CartProvider>
  </ProductProvider>,

  document.getElementById('root')
);
