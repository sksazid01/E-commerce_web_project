import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch, useSelector } from 'react-redux'
import { placeOrder } from '../../actions/orderActions'
import { updateBalance } from '../../actions/adminAction'
import { clearEntireCart } from '../../actions/cartActions'
import './Checkout.css'

export default function Checkout({ subtotal }) {
  const dispatch = useDispatch()
  const [animationState, setAnimationState] = useState('')
  
  const orderState = useSelector((state) => state.placeOrderReducer)
  const userState = useSelector(state => state.loginUserReducer)
  const { currentUser } = userState
  const { loading, error, success } = orderState

  async function tokenHandler(token) {
    try {
      setAnimationState('loading')
      
      // Process the order
      await dispatch(placeOrder(token, subtotal))
      await dispatch(updateBalance(currentUser.email, subtotal, token))
      
      // If order is successful, clear the cart and show animation
      dispatch(clearEntireCart())
      setAnimationState('success')
      
      // Redirect after success animation
      setTimeout(() => {
        window.location.href = '/'
      }, 3000)
      
    } catch (error) {
      console.error('Payment failed:', error)
      setAnimationState('')
    }
  }

  return (
    <div className="checkout-container">
      {animationState === 'loading' && (
        <div className="loading-wrapper">
          <div className="loading-animation">
            <div className="loading-spinner"></div>
            <p>Processing your payment...</p>
          </div>
        </div>
      )}
      
      {animationState === 'success' && (
        <div className="success-wrapper">
          <div className="success-animation">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div className="success-text">
              <h3>Payment Successful!</h3>
              <p>Thank you for your purchase.</p>
              <p>Redirecting to home page...</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="btn-checkout-wrapper">
        {!success && !loading && !animationState && (
          <StripeCheckout
            amount={subtotal * 100}
            shippingAddress
            token={tokenHandler}
            currency='BDT'
            stripeKey='pk_test_51LJdoPD9PVEyJI4UvvDlPGKKTlwUQOYffUqygRZU8snRITH4WQoCGQwsZWEdubhMNfxplKJAlBN4Mdg6BfBMzk0g00ADD0ottW'
          >
            <button className='btn_checkout'>Pay Now</button>
          </StripeCheckout>
        )}
      </div>
    </div>
  )
}
