import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { CartContext } from '../contexts/CartContext'

const LoginLink = () => {

  const { user, userLogout } = useContext(UserContext);
  const { clearCart } = useContext(CartContext)

  if (user.token) {
    return <button className="login-btn" onClick={() => {
      userLogout();
      clearCart();
    }}>
      logout
    </button>
  }

  return (
    <Link to="/login">login</Link>
  )
}

export default LoginLink
