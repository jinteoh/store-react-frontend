import React, { useState, createContext, useEffect } from 'react'

export const UserContext = createContext();

function getUserFromLocalStorage() {

    return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : { username: null, token: null };
}


const UserProvider = ({ children }) => {

    // const [user, setUser] = useState({ username: null, token: null })
    const [user, setUser] = useState(getUserFromLocalStorage())
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' })

    const showAlert = ({ message, type = "success" }) => {
        setAlert({ show: true, message, type })
    }

    const hideAlert = () => {
        setAlert({ ...alert, show: false })
    }

    const userLogin = user => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user))
    }

    const userLogout = () => {
        setUser({ username: null, token: null });
        localStorage.removeItem('user');
    }

    return (
        <UserContext.Provider value={{ user, userLogin, userLogout, alert, showAlert, hideAlert }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
