import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../actions/userAction'
import { checkLoggedAsAdmin } from '../../utils/authUtils'
import './UserRegister.css'

export default function UserRegister() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  
  const dispatch = useDispatch()
  const { loading, success } = useSelector(state => state.registerUserReducer)

  useEffect(() => {
    checkLoggedAsAdmin()
    if (localStorage.getItem('currentUser')) {
      window.location.href = '/'
    }
  }, [])

  useEffect(() => {
    if (success && !loading) {
      notify('reg', "Registration Successful", 2000)
    }
  }, [success, loading])

  const notify = (callId, msg, timex) => {
    if (callId === '' || callId === 'passNotMatch') {
      return toast.warning(msg, { position: toast.POSITION.TOP_CENTER, autoClose: timex })
    }
    if (callId === 'reg') {
      toast.success(msg, { position: toast.POSITION.TOP_CENTER, autoClose: timex })
    }
  }

  function register() {
    if (!name || !email || !password || !cpassword || !email.match(/.+@.+/)) {
      if (!email.match(/.+@.+/)) { setEmail('') }
      return notify('', "Please fill all fields correctly", 1000)
    }
    
    if (password !== cpassword) {
      return notify('passNotMatch', "Passwords do not match", 1000)
    }
    
    const user = { name, email, password }
    dispatch(registerUser(user))
  }

  return (
    <div className="login-container">
      <ToastContainer limit={2} />
      <div className="login-box">
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Join us today</p>
        </div>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-group">
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <i className="fas fa-user"></i>
            </div>
          </div>

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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <div className="input-group">
              <input
                type="password"
                id="cpassword"
                placeholder="Confirm your password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
                required
              />
              <i className="fas fa-lock"></i>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-button"
            onClick={register}
            disabled={loading}
          >
            {loading ? (
              <span>
                <i className="fas fa-spinner fa-spin"></i> Creating Account...
              </span>
            ) : (
              <span>
                <i className="fas fa-user-plus"></i> Create Account
              </span>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account?</p>
          <a href="/login" className="register-link">
            Sign In
          </a>
        </div>
      </div>
    </div>
  )
}
