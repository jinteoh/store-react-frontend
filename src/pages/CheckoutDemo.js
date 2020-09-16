import React, { useContext, useState, useEffect } from 'react'
import { useStripe, useElements, FpxBankElement } from '@stripe/react-stripe-js';
import submitOrder from '../strapi/submitOrder'
import { UserContext } from '../contexts/UserContext'
import axios from 'axios'
import serverURL from '../utils/URL'
import { useHistory } from 'react-router-dom'

const useOptions = () => {
    const options = {
        accountHolderType: "individual",
        style: {
            base: {
                padding: "10px 14px",
            }
        }
    }
    return options;
}

const CheckoutDemo = () => {

    const [success, setSuccess] = useState('')
    // console.log(window.location.href);
    const history = useHistory();

    const { user } = useContext(UserContext);

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    useEffect(() => {

        if (!stripe || !elements) {
            return;
        }




        const orderComplete = (clientSecret) => {
            stripe.retrievePaymentIntent(clientSecret).then(function (result) {
                console.log('payment succeed : ', payment_intent_client_secret);
                console.log(result.paymentIntent.status);
            })


            // setSuccess('success')
            // axios.post(`${serverURL}/orders`, {
            //     result
            // }).catch(error => console.log(error))
        }

        const url = new URL(window.location.href);
        var payment_intent_client_secret = url.searchParams.get(
            "payment_intent_client_secret"
        );

        if (payment_intent_client_secret) {

            let status = url.searchParams.get("redirect_status");
            if (status === "succeeded") {
                orderComplete(payment_intent_client_secret);
            } else {
                console.log(status);
            }
        }
    }, [stripe])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const fpxBankElement = elements.getElement(FpxBankElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'fpx',
            fpx: fpxBankElement,
            billing_details: {
                name: e.target.name.value,
                "address": {
                    "city": e.target.address.value
                }
            }
        });

        let balance = await axios.get(`${serverURL}/balances`, {
            text: "hello world"
        }).catch(error => console.log("[Balance]", error));


        console.log('payment redirect');

        /** get client_secret */
        let response = await axios.post(`${serverURL}/payments`, {
            paymentMethod,
            currency: 'myr',
            amount: 2,
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        }).catch(error => console.log(error));

        const client_secret = response.data.client_secret
        /**end of client_secret */

        stripe.confirmFpxPayment(client_secret, {
            payment_method: {
                fpx: fpxBankElement
            },
            return_url: window.location.href
        }).then(function (result) {
            if (result.error) {
                console.log(result.error.message);
            }
        })
    };


    return (
        <section className="section form">
            <p>{success}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input name="name" type="text" placeholder="Jenny Rosen" required />
                </label>
                <label>
                    address
                    <input name="address" type="text" placeholder="Jenny Rosen" required />
                </label>
                <label>
                    FPX Bank
                    <FpxBankElement
                        className="FpxBankElement"
                        options={options}
                    />
                </label>
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {/* fpx */}
        </section>

    );
}

export default CheckoutDemo













        // const payload = await stripe.createPaymentMethod({
        //     type: "fpx",
        //     fpx: fpxBankElement,
        //     billing_details: {
        //         name: e.target.name.value
        //     }
        // })
        // console.log("[PaymentMethod]", payload);