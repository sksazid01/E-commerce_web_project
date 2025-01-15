import React, { useEffect } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, CircularProgress, Typography, Container } from '@material-ui/core';
import { getAllOrders, ShippingAOrder } from '../actions/supplierActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useStyles from './styles';

export const Cards = function Cards() {
  const styles = useStyles();
  const dispatch = useDispatch();
  const orderstate = useSelector(state => state.getAllOrdersReducer);
  const { orders, error, loading } = orderstate;

  const [show, setShow] = useState(false);
  const [UIDPass, setUIDPass] = useState("");

  const handleClose = () => setShow(false);
  const handleClose_withConfirm = (order) => { 
    
    if(UIDPass !="supplier"){
      // console.log(currentAdmin[0].password," vs You vs ",UIDPass);
      toast.error("Suppliers's Credential Doesn't Match",
       {position: toast.POSITION.TOP_CENTER,autoClose:3000})
      setUIDPass("")
      setShow(false);
      return;
    }
    console.log('Accpeted'+order._id); 
    dispatch(ShippingAOrder({orderid:order._id}))
    toast.success("Product Supplied for OrderID- "+order._id,
    {position: toast.POSITION.TOP_RIGHT,autoClose:3000})
    setUIDPass("")
    setShow(false);
    
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress className={styles.progress} size={48} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={styles.loadingContainer}>
        <Typography className={styles.errorText}>
          {error || 'Error loading orders. Please try again.'}
        </Typography>
      </Box>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Box className={styles.loadingContainer}>
        <Typography className={styles.emptyText}>
          No orders available at the moment
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <Container maxWidth="lg">
        <Typography variant="h4" className={styles.pageTitle}>
          Supplier Orders Dashboard
        </Typography>
        
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
        
        <Grid container spacing={4} className={styles.gridContainer}>
          {orders.map((order) => (
            <Grid item xs={12} key={order._id}>
              <Card order={order} handleShow={handleShow} handleClose_withConfirm={handleClose_withConfirm} UIDPass={UIDPass} setUIDPass={setUIDPass} show={show} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Cards;