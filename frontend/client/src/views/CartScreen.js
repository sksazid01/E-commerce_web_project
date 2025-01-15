import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, deleteFromCart, clearEntireCart } from '../actions/cartActions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { checkUser } from '../utils/authUtils'
import Checkout from '../components/Checkout/Checkout'
import './CartScreen.css'

export default function CartScreen() {
  checkUser()
  const dispatch = useDispatch()
  const cartState = useSelector(state => state.cartReducer)
  const cartItems = cartState.cartItems
  const subtotal = cartItems.reduce((x, item) => x + item.price, 0)

  const notify = (callId, msg) => {
    toast.clearWaitingQueue({ containerId: 'default' })
    if (callId === 'limit') {
      return toast.info(msg, { position: toast.POSITION.TOP_CENTER, autoClose: 1000 })
    }
    if (callId === 'success') {
      return toast.success(msg, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
    }
  }

  function increaseCount(item) {
    if (item.quantity === 20) 
      return notify('limit', "We deliver maximum of 20 quantities")
    dispatch(addToCart(item, Math.min(item.quantity + 1, 20), item.varient))
  }

  function decreaseCount(item) {
    if (item.quantity === 1) 
      return notify('limit', "Can't Order Less than 1 quantities")
    dispatch(addToCart(item, Math.max(item.quantity - 1, 1), item.varient))
  }

  function removeItemCart(item) {
    dispatch(deleteFromCart(item))
  }

  const handlePaymentSuccess = () => {
    // Clear the entire cart at once
    dispatch(clearEntireCart())
    notify('success', 'Payment successful! Your cart has been cleared.')
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      window.location.replace('/')
    }, 2000)
  }

  return (
    <div className='cart-screen'>
      <ToastContainer limit={1} containerId="default" />
      
      <div className='cart-container'>
        <div className='cart-header'>
          <button className='back-button' onClick={() => window.location.replace('/')}>
            <i className='fas fa-arrow-left'></i>
            <span>Continue Shopping</span>
          </button>
          <h1>Shopping Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className='empty-cart'>
            <i className='fas fa-shopping-cart'></i>
            <h2>Your cart is empty</h2>
            <p>Browse our products and discover our best deals!</p>
            <a href='/' className='shop-now-btn'>Shop Now</a>
          </div>
        ) : (
          <>
            <div className='cart-items'>
              {cartItems.map(item => {
                const defaultPrice = JSON.stringify(item.prices[0]).split(',')[0].split(':')[1]
                return (
                  <div className='cart-item' key={item.name}>
                    <div className='item-image'>
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className='item-info'>
                      <div className='item-header'>
                        <h3>{item.name}</h3>
                        <button className='remove-btn' onClick={() => removeItemCart(item)}>
                          <i className='fas fa-times'></i>
                        </button>
                      </div>
                      
                      <p className='item-variant'>
                        Manufacturer: {item.varient !== "null" ? item.varient : item.varients[0]}
                      </p>
                      
                      <div className='quantity-controls'>
                        <button 
                          className='qty-btn' 
                          onClick={() => decreaseCount(item)}
                          disabled={item.quantity === 1}
                        >
                          <i className='fas fa-minus'></i>
                        </button>
                        <span className='quantity'>{item.quantity}</span>
                        <button 
                          className='qty-btn'
                          onClick={() => increaseCount(item)}
                          disabled={item.quantity === 20}
                        >
                          <i className='fas fa-plus'></i>
                        </button>
                      </div>
                    </div>
                    
                    <div className='price-info'>
                      <div className='unit-price'>
                        <span>Unit Price:</span>
                        <span>৳{item.varient !== "null" ? item.prices[0][item.varient] : defaultPrice}</span>
                      </div>
                      <div className='quantity-price'>
                        <span>Quantity:</span>
                        <span>× {item.quantity}</span>
                      </div>
                      <div className='total-price'>
                        <span>Total:</span>
                        <span>৳{JSON.stringify(item.price) !== 'null' ? 
                          item.price : defaultPrice * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className='cart-summary'>
              <div className='summary-row'>
                <span>Subtotal:</span>
                <span>৳{subtotal}</span>
              </div>
              <Checkout subtotal={subtotal} onPaymentSuccess={handlePaymentSuccess} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
