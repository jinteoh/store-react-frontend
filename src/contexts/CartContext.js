import React, { useState, createContext, useEffect } from 'react'
// import LocalCart from '../utils/localCart'

function getCartFromLocalStorage() {
    return localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : [];
}

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getCartFromLocalStorage());
    const [total, setTotal] = useState(0);
    const [cartItems, setCartItems] = useState(0)

    useEffect(() => {
        // local storage
        localStorage.setItem("cart", JSON.stringify(cart));
        let newCartItems = cart.reduce((total, cartItem) => {
            return total += cartItem.amount
        }, 0)
        setCartItems(newCartItems);
        // cart total
        let newTotal = cart.reduce((total, cartItem) => {
            return total += (cartItem.amount * cartItem.price);
        }, 0)
        newTotal = parseFloat(newTotal.toFixed(2));
        setTotal(newTotal);
    }, [cart])

    // remove item
    const removeItem = (id) => {
        setCart(cart.filter(item => item.id !== id))
    }
    // increase amount
    const increaseAmount = (id) => {
        const newCart = cart.map(item => {
            return item.id === id ? { ...item, amount: item.amount + 1 } :
                { ...item }
        })
        setCart(newCart);
    }
    // decrease amount
    const decreaseAmount = (id, amount) => {
        if (amount === 1) {
            removeItem(id);
            return;
        } else {
            const newCart = cart.map(item => {
                return item.id === id ? { ...item, amount: item.amount - 1 } :
                    { ...item }
            })
            setCart(newCart);
        }
    }

    // add to cart
    const addToCart = (product) => {
        const { id, title, price, image } = product;
        const item = cart.find(item => item.id === id);
        if (item) {
            increaseAmount(id)
            return;
        } else {
            const newItem = { id, image, title, price, amount: 1 }
            const newCart = [...cart, newItem];
            setCart(newCart)
        }
    }

    // clear cart
    const clearCart = () => {
        setCart([]);
    }

    useEffect(() => {

        return () => {
        }
    }, [])

    return (
        <CartContext.Provider value={{ cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>

    )
}

export default CartProvider
