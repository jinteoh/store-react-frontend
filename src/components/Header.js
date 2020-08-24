import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import CartLink from './Cart/CartLink'
import LoginLink from '../components/LoginLink'
import { UserContext } from '../contexts/UserContext'

export default function Header() {

  const { user } = useContext(UserContext);

  return (
    <header className="header">
      <img src={Logo} alt="vintage tech logo" className="logo" />
      <nav>
        <ul>
          {/* Left bar */}
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            {user.token &&
              <li>
                <Link to="/checkout">checkout</Link>
              </li>
            }
          </div>

          {/* right bar */}
          <div>
            <LoginLink />
            <CartLink />

          </div>

        </ul>
      </nav>
    </header>
  )
}
