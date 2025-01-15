import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrders } from '../../actions/orderActions'
import { getAllOrders, verifyAOrder, updateAdminBalance } from '../../actions/adminAction'
import { checkUser } from '../../utils/authUtils'
import { Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './OrderScreen.css'

export default function OrderScreen() {
  const dispatch = useDispatch()
  const adminState = useSelector(state => state.verifyAdminReducer)
  const { loadx, sucx } = useSelector(state => state.verifyAOrderReducer)
  const { currentAdmin } = adminState
  const [show, setShow] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  const handleClose = () => {
    setShow(false)
    setSelectedOrder(null)
  }

  const handleShow = (order) => {
    setSelectedOrder(order)
    setShow(true)
  }

  const handleConfirm = (order) => {
    dispatch(verifyAOrder({ orderid: order._id }))
    dispatch(updateAdminBalance(currentAdmin[0].email, order.orderAmount))
    toast.success("Order Forwarded to Supplier", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000
    })
    handleClose()
  }

  const orderstate = useSelector(state => state.getUserOrdersReducer)
  const orderstateAdmin = useSelector(state => state.getAllOrdersReducer)
  const logState = !(!localStorage.getItem('currentAdmin'))
  const { orders, error, loading } = logState ? orderstateAdmin : orderstate

  useEffect(() => {
    if (!logState) {
      dispatch(getUserOrders())
      checkUser()
    } else {
      dispatch(getAllOrders())
    }
  }, [dispatch, logState])

  const getStatusIcon = (status) => {
    switch (status) {
      case 0:
        return <i className="fas fa-hourglass status-processing"></i>
      case 1:
        return <i className="fas fa-shipping-fast status-shipped"></i>
      case 2:
        return <i className="fas fa-check-circle status-delivered"></i>
      default:
        return null
    }
  }

  const getStatusText = (status, isAdmin) => {
    switch (status) {
      case 0:
        return "Processing"
      case 1:
        return "Shipping"
      case 2:
        return isAdmin ? "Supplied" : "Delivered"
      default:
        return "Unknown"
    }
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-message">
        <i className="fas fa-exclamation-circle"></i>
        <p>Error loading orders. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="orderScreenHolder">
      <ToastContainer />
      <h2 className="order-title">
        {logState ? "Manage Orders" : "My Orders"}
      </h2>

      <div className="row justify-content-center">
        {orders && orders.map(order => (
          <div className="col-md-8" key={order._id}>
            <div className="order-card">
              <div className="order-section">
                <h3 className="section-title">
                  <i className="fas fa-shopping-bag"></i>
                  Order Items
                </h3>
                {order.orderItems.map((item, index) => (
                  <div className="order-item" key={index}>
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-variant">
                        {item.varient} × {item.quantity}
                      </span>
                    </div>
                    <span className="item-price">৳{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="order-section">
                <h3 className="section-title">
                  <i className="fas fa-user"></i>
                  Customer Details
                </h3>
                <div className="customer-info">
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.pincode}, {order.shippingAddress.country}</p>
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Total Amount:</strong> <span className="item-price">৳{order.orderAmount}</span></p>
                  <p><strong>Transaction ID:</strong> {order.transactionId.slice(-8)}</p>
                </div>
              </div>

              <div className="order-status">
                {order.isDelivered === 0 && (
                  <div className="status-badge status-processing">
                    <i className="fas fa-spinner fa-spin"></i>
                    <span>Processing Order</span>
                    <div className="processing-details">
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" 
                             role="progressbar" 
                             style={{width: '30%'}} 
                             aria-valuenow="30" 
                             aria-valuemin="0" 
                             aria-valuemax="100">
                        </div>
                      </div>
                      <small>Estimated processing time: 24-48 hours</small>
                    </div>
                  </div>
                )}
                {order.isDelivered === 1 && (
                  <div className="status-badge status-shipping">
                    <i className="fas fa-truck"></i>
                    <span>In Transit</span>
                  </div>
                )}
                {order.isDelivered === 2 && (
                  <div className="status-badge status-delivered">
                    <i className="fas fa-check-circle"></i>
                    <span>{logState ? "Supplied" : "Delivered"}</span>
                  </div>
                )}
              </div>

              {logState && order.isDelivered === 0 && (
                <div className="order-actions">
                  <button className="btn-confirm" onClick={() => handleShow(order)}>
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal show={show && selectedOrder} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Order #{selectedOrder?._id.slice(-8)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Order Amount:</strong>{" "}
            <span className="amount-highlight">৳{selectedOrder?.orderAmount}</span>
          </p>
          <hr />
          <p>
            By confirming this order:
          </p>
          <ul>
            <li>A supply request will be sent to the supplier</li>
            <li>The amount will be deducted from the admin account</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-modal btn-close" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-modal btn-proceed"
            onClick={() => handleConfirm(selectedOrder)}
          >
            Proceed
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
