import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../actions/userAction'
import { logoutAdmin } from '../../actions/adminAction'
import './Navbar.css'

export default function Navbar() {
  const cartState = useSelector(state => state.cartReducer)
  const userState = useSelector(state => state.loginUserReducer)
  const adminState = useSelector(state => state.verifyAdminReducer)
  const { currentUser } = userState
  const { currentAdmin } = adminState
  const dispatch = useDispatch()

  return (
    <div className="whole_navbar">
      <nav className="navbar nav_component navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <b>E</b>-COMMERCE
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <i className="fas fa-home"></i> Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/orders">
                    <i className="fas fa-list-alt"></i> Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    <i className="fas fa-shopping-cart"></i>
                    {cartState.cartItems.length > 0 && (
                      <span className="cart-badge">
                        {cartState.cartItems.reduce((total, item) => total + parseInt(item.quantity), 0)}
                      </span>
                    )}
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => dispatch(logoutUser())}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </>
            )}

            {currentAdmin && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/orders">
                    <i className="fas fa-list-alt"></i> Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/addItem">
                    <i className="fas fa-plus"></i> Add Item
                  </a>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => dispatch(logoutAdmin())}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </li>
              </>
            )}

            {!currentUser && !currentAdmin && (
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <i className="fas fa-user"></i> Login
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}
