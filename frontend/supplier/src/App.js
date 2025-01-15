import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';
import { getAllOrders, ShippingAOrder } from './actions/supplierActions';
import './App.css';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#1976D2',
      light: '#90CAF9',
      dark: '#1565C0',
    },
    secondary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#E0E0E0',
      secondary: '#B0B0B0',
    },
    divider: '#404040',
  },
});

function App() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [UIDPass, setUIDPass] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedOrder(null);
  };

  const handleShow = (order) => {
    setSelectedOrder(order);
    setShow(true);
  };

  const handleClose_withConfirm = (order) => {
    dispatch(ShippingAOrder({ orderid: order._id }));
    toast.success("Product Supplied for OrderID - " + order._id, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      theme: "dark"
    });
    setUIDPass("");
    setShow(false);
  };

  const orderstate = useSelector(state => state.getAllOrdersReducer);
  const { orders, error, loading } = orderstate;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      currencyDisplay: 'narrowSymbol',
    }).format(amount).replace('৳', '৳ ');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="orderScreenHolder">
          <div className="dashboard-title">
            <i className="fas fa-truck-loading"></i>
            Shipping Orders Dashboard
          </div>

          {loading && (
            <div className="loading-state">
              <i className="fas fa-circle-notch fa-spin"></i>
              <span style={{ marginLeft: '1rem' }}>Loading orders...</span>
            </div>
          )}

          {error && (
            <div className="error-state">
              <i className="fas fa-exclamation-circle"></i>
              <span style={{ marginLeft: '1rem' }}>Error loading orders</span>
            </div>
          )}

          {orders && orders.map(order => (
            order.isDelivered !== 0 && (
              <div className="flex-container" key={order._id}>
                <div className="order-info">
                  <div className="order-info-item">
                    <span className="order-info-label">Transaction ID:</span>
                    <span>{order.transactionId.slice(13)}</span>
                  </div>
                  <div className="order-info-item">
                    <span className="order-info-label">Order Amount:</span>
                    <span>{formatCurrency(order.orderAmount)}</span>
                  </div>
                  <div className="order-info-item">
                    <span className="order-info-label">Order Date:</span>
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>

                <div className="ExtendedOrder">
                  {order.isDelivered === 1 && (
                    <button className="supply-button" onClick={() => handleShow(order)}>
                      <i className="fas fa-box-check"></i>
                      Supply Product
                    </button>
                  )}

                  {order.isDelivered === 2 && (
                    <div className="order-status">
                      <i className="fas"></i>
                      <span>Supplied</span>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}

          <Modal show={show} onHide={handleClose} className="modal-content">
            <Modal.Header closeButton>
              <Modal.Title className="modal-title">
                <i className="fas fa-clipboard-list" style={{ marginRight: '0.5rem', color: '#90CAF9' }}></i>
                Order Details - #{selectedOrder?._id.slice(4)}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {selectedOrder && (
                <>
                  <div className="order-info-item">
                    <span className="order-info-label">Customer:</span>
                    <span>{selectedOrder.name}</span>
                  </div>
                  <div className="order-info-item">
                    <span className="order-info-label">Address:</span>
                    <span>
                      {`${selectedOrder.shippingAddress.street}, ${selectedOrder.shippingAddress.city}, 
                      ${selectedOrder.shippingAddress.country} - ${selectedOrder.shippingAddress.pincode}`}
                    </span>
                  </div>
                  <div className="order-info-item">
                    <span className="order-info-label">Amount:</span>
                    <span>{formatCurrency(selectedOrder.orderAmount)}</span>
                  </div>
                  <div className="order-info-item">
                    <span className="order-info-label">Transaction:</span>
                    <span>{selectedOrder.transactionId}</span>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <h6 style={{ color: '#90CAF9', marginBottom: '1rem' }}>
                      <i className="fas fa-box" style={{ marginRight: '0.5rem' }}></i>
                      Order Items
                    </h6>
                    {selectedOrder.orderItems.map((item, index) => (
                      <div className="order-item" key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>{item.name} [{item.varient}]</span>
                          <span>{item.quantity} × {formatCurrency(item.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '1.5rem', color: '#B0B0B0', fontSize: '0.9rem' }}>
                    <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
                    Note: Confirming this supply request will transfer items from your inventory
                  </div>
                </>
              )}
            </Modal.Body>

            <Modal.Footer>
              <button className="modal-close-btn" onClick={handleClose}>
                <i className="fas fa-times"></i>
                Cancel
              </button>
              <button
                className="modal-accept-btn"
                onClick={() => handleClose_withConfirm(selectedOrder)}
              >
                <i className="fas fa-check"></i>
                Confirm Supply
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
