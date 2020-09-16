import React, { useContext, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { UserContext } from '../contexts/UserContext'
import { useHistory } from 'react-router-dom'
import EmptyCart from '../components/Cart/EmptyCart';

// react-stripe-elements
import { CardElement, StripeProvider, Elements, injectStripe, FpxBankElement } from 'react-stripe-elements'
import submitOrder from '../strapi/submitOrder'


function Checkout(props) {


  const { cart, total, clearCart } = useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = useContext(UserContext);

  const history = useHistory();

  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const isEmpty = !name || alert.show;

  async function handleSubmit(e) {
    showAlert({ message: 'submitting order...' })
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch(error => console.log(error))

    const { token } = response;
    if (token) {
      setError('');
      const { id } = token;
      let order = await submitOrder({
        name,
        total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token
      })

      console.log(order);

      if (order) {
        showAlert({ message: 'your order is complete' });
        clearCart();
        history.push('/');
        return;
      } else {
        showAlert({ message: 'there was an error with order. please try again!', type: 'danger' })
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }

  async function handleFPXSubmit(e) {
    e.preventDefault();
  }

  if (cart.length < 1) return <EmptyCart />

  return (
    <section className="section form">
      <h2 className="section-title">checkout</h2>
      <form className="checkout-form">
        <h3>order total: <span>${total}</span></h3>
        {/* single input */}
        <div className="form-control">
          <label htmlFor="name">
            name
          </label>
          <input type="text" id="name" value={name} onChange={(e) => {
            setName(e.target.value);
          }} />
        </div>
        {/* end single input */}
        {/* card element */}
        <div className="stripe-input">
          <label htmlFor="card-element">Credit or Debt card</label>
          <p className="stripe-info">
            Test using this credit card : <span>4242 4242 4242 4242</span>
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>

        </div>
        <CardElement className="card-element"></CardElement>
        <br />



        {error && <p className="form-empty">{error}</p>}
        {
          isEmpty
            ? <p className="form-empty">please fill out name field</p>
            : <button type="submit" data-secret="<%= @intent.client_secret %>" onClick={handleSubmit} className="btn btn-primary btn-block">
              submit
              </button>
        }
      </form>

      {/* fpx  */}

      {/* end of fpx */}
    </section>
  )
}

const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_alNmeUpSHVr005rTbQgs9MY700bXuQanew">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  )
}

export default StripeWrapper