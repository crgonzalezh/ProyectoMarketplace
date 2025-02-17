import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ItemsProvider from './context/ItemsContext';
import UserProvider from './context/UserContext';
import CartProvider from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* Proveedor de autenticación */}
        <UserProvider>
          <ItemsProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ItemsProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


