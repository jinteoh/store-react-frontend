import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/CartContext'

const CartLink = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <div className="cart-link-container">
      <Link to="/cart">cart</Link>
      <span className="cart-link-total">{cartItems}</span>
    </div>
  )
}

export default CartLink
