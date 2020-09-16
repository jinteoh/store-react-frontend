import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import { About, Cart, Checkout, Error, Home, Login, ProductDetails, Products } from './pages'
// components
import Header from './components/Header'
import Alert from './components/Alert'
import PrivateRoute from './components/PrivateRoute'
import ScrollButton from './components/ScrollButton'
import CheckoutDemo from './pages/CheckoutDemo'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_alNmeUpSHVr005rTbQgs9MY700bXuQanew');
// const stripePromise = loadStripe('pk_live_mwfCj0Hc0mvOj2GdNYvk3iKR004K8Nq8lW');

function App() {
  return (
    <Router>
      <Header />
      <Alert />
      <ScrollButton />
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <PrivateRoute path="/checkout">
          <Checkout />
        </PrivateRoute>


        <Route path="/checkoutdemo">
          <Elements stripe={stripePromise}>
            <CheckoutDemo />
          </Elements>
        </Route>


        <Route path="/login">
          <Login />
        </Route>

        <Route exact path="/products">
          <Products />
        </Route>

        <Route path="/products/:id" children={<ProductDetails></ProductDetails>}>
        </Route>

        <Route path="*">
          <Error />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
