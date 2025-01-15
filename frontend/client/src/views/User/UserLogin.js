import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../actions/userAction'
import { checkLoggedAsAdmin } from '../../utils/authUtils'
import './UserLogin.css'

export default function UserLogin() {
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const dispatch = useDispatch()
  const { loadingx, successx } = useSelector(state => state.loginUserReducer)

  useEffect(() => {
    checkLoggedAsAdmin()
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/'
    }
  }, [])

  useEffect(() => {
    if (successx && !loadingx) {
      notify('reg', "Login Successful", 2000)
    }
  }, [successx, loadingx])

  const notify = (callId, msg, timex) => {
    if (callId === '' || callId === 'passNotMatch') {
      return toast.warning(msg, { position: toast.POSITION.TOP_CENTER, autoClose: timex })
    }
    if (callId === 'reg') {
      toast.success(msg, { position: toast.POSITION.TOP_CENTER, autoClose: timex })
    }
  }

  function loginWithUser() {
    if (!email || !password || !email.match(/.+@.+/)) {
      if (!email.match(/.+@.+/)) { setEmail('') }
      return notify('', "Please enter valid email and password", 1000)
    }
    const user = { email, password }
    dispatch(loginUser(user))
  }

  return (
    <div className="login-container">
      <ToastContainer limit={2} />
      <div className="login-box">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="fas fa-envelope"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-button"
            onClick={loginWithUser}
            disabled={loadingx}
          >
            {loadingx ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Signing in...
              </span>
            ) : (
              <span>
                <i className="fas fa-sign-in-alt"></i> Sign In
              </span>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account?</p>
          <a href="/register" className="register-link">
            Create Account
          </a>
        </div>
      </div>
    </div>
  )
}
