import React, { useState, useContext } from 'react'
import loginUser from '../strapi/loginUser'
import RegisterUser from '../strapi/registerUser'
import { UserContext } from '../contexts/UserContext'

// strapi function

// handle user
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('default');
  const [isMember, setIsMember] = useState(true);

  const { userLogin, alert, showAlert } = useContext(UserContext);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember(!isMember)
    isMember ? setUsername('') : setUsername('default');
  }

  const handleSubmit = async (e) => {
    showAlert({
      message: 'accessing user data. please wait ....'
    })
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password })
    } else {
      response = await RegisterUser({ email, password, username })
    }
    if (response) {
      const { jwt: token, user: { username } } = response.data
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({
        message: `you are logged in : ${username}. continue shopping...`
      })
      history.push("/products")
    } else {
      showAlert({
        message: `wrong credential. try again...`,
        type: "danger"
      })
    }
  }

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">

        {/* single input */}
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input type="email" id="email" value={email} onChange={e => {
            setEmail(e.target.value)
          }}></input>
        </div>
        {/* end of single input */}

        {/* single input */}
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input type="password" id="password" value={password} onChange={e => {
            setPassword(e.target.value)
          }}></input>
        </div>
        {/* end of single input */}

        {/* single input */}
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input type="text" id="username" value={username} onChange={e => {
              setUsername(e.target.value)
            }}></input>
          </div>
        )}
        {/* end of single input */}

        {/* empty form text */}

        {isEmpty && <p className="form-empty">please fill out all form fields</p>}

        {/* submit btn */}
        {
          !isEmpty && <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}>
            submit
          </button>
        }

        {/* register link */}
        <p className="register-link">
          {isMember ? "need to register" : 'already a member'}
          <button type="button" onClick={toggleMember}>click here</button>
        </p>


      </form>
    </section>
  )
}

export default Login
