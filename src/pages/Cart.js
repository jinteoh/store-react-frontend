import React, { useContext } from "react";
import { CartContext } from '../contexts/CartContext'
import { UserContext } from '../contexts/UserContext'
import EmptyCart from '../components/Cart/EmptyCart'
import { Link } from 'react-router-dom'
import CartItem from "../components/Cart/CartItem";

export default function Cart() {
  const { user } = useContext(UserContext)
  const { cart, total } = useContext(CartContext);

  if (cart.length === 0) {
    return <EmptyCart />
  }
  return (
    <section className="cart-items section">
      <h2>your cart</h2>
      {cart.map(item => {
        return <CartItem key={item.id} {...item} />
      })}
      <h2>total : ${total}</h2>
      {user.token ?
        <Link to="/checkout" className="btn btn-primary btn-block">
          checkout
      </Link> :
        <Link to="/login" className="btn btn-primary btn-block">
          login
      </Link>
      }


    </section>
  )
}
