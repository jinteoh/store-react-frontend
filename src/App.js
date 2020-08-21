import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// pages
import { About, Cart, Checkout, Error, Home, Login, ProductDetails, Products } from './pages'
// components
import Header from './components/Header'

function App() {
  return (
    <Router>
      <Header />
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
        <Route path="/checkout">
          <Checkout />
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
