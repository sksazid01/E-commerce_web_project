import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUID } from './actions/uidlogin';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()
  const { loadingx, successx, currentBankUser } = useSelector(state => state.loginUIDReducer)

  function loginWithUID() {
    setLoading(true);
    if (!password || (email && !email.match(/.+@.+/))) {
      setLoading(false);
      return toast.warning('Please enter valid email and password',
        { position: toast.POSITION.TOP_CENTER, autoClose: 1800 })
    }
    const bankuser = { email, password }
    dispatch(loginUID(bankuser))
    setLoading(false);
  }

  function logout() {
    localStorage.removeItem('currentBankUser');
    window.location.href = '/'
  }

  useEffect(() => {
    const bankuser = { email, password }
    let timer1 = setTimeout(() => dispatch(loginUID(bankuser)), 500000);
    return () => clearTimeout(timer1);
  });

  return (
    <div className="App">
      <ToastContainer limit={2} />
      {!currentBankUser ? (
        <div className="auth-container">
          <div className="login-container">
            <div className="login-header">
              <img src="https://firebasestorage.googleapis.com/v0/b/eateryapp-48bb7.appspot.com/o/4bdbd054b3c97790e81884ada062caa5-removebg-preview.png?alt=media&token=aafd1a91-2eda-4b63-be7b-eb38f5bd7b97" 
                   alt="Bank Logo" 
                   className="bank-logo"
              />
              <h1>Welcome Back</h1>
              <p>Please login to access your account</p>
            </div>
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="login-button" 
                onClick={loginWithUID}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="dashboard-container">
          <nav className="dashboard-nav">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/eateryapp-48bb7.appspot.com/o/4bdbd054b3c97790e81884ada062caa5-removebg-preview.png?alt=media&token=aafd1a91-2eda-4b63-be7b-eb38f5bd7b97" 
              alt="Bank Logo" 
              className="nav-logo"
            />
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </nav>
          <div className="dashboard-content">
            <div className="profile-section">
              <div className="profile-header">
                <img 
                  className="profile-avatar"
                  src="https://static.vecteezy.com/system/resources/previews/039/845/042/non_2x/male-default-avatar-profile-gray-picture-grey-photo-placeholder-gray-profile-anonymous-face-picture-illustration-isolated-on-white-background-free-vector.jpg" 
                  alt="Profile"
                />
                <h2 className="white-text">Welcome, {currentBankUser.email}</h2>
              </div>

              <div className="account-details">
                <div className="detail-card">
                  <span className="detail-label">Account Number</span>
                  <h3 className="detail-value">{currentBankUser.bankUID}</h3>
                </div>

                <div className="detail-card">
                  <span className="detail-label">Account Balance</span>
                  <h3 className="detail-value">{currentBankUser.bdt} BDT</h3>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
