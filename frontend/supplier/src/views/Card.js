import React from 'react';
import useStyles from './styles';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const DarkTextField = withStyles({
  root: {
    '& label': {
      color: '#B0B0B0',
    },
    '& label.Mui-focused': {
      color: '#90CAF9',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#90CAF9',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#404040',
      },
      '&:hover fieldset': {
        borderColor: '#B0B0B0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90CAF9',
      },
      '& input': {
        color: '#E0E0E0',
      },
    },
  },
})(TextField);

export const Cardd = function Cardd({ order, handleShow, handleClose_withConfirm, show, UIDPass, setUIDPass }) {
  const styles = useStyles();

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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card className={cx(styles.root)}>
      <CardContent>
        <Box className={styles.cardHeader}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Order #{order._id.slice(-6)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(order.createdAt)}
            </Typography>
          </Box>

          <Box className={styles.orderInfo}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body1">Transaction ID</Typography>
              <Typography variant="body2">{order.transactionId}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body1">Amount</Typography>
              <Typography variant="body2">{formatCurrency(order.orderAmount)}</Typography>
            </Box>
          </Box>

          {order.isDelivered === 0 && (
            <Button
              variant="contained"
              className={styles.acceptButton}
              onClick={handleShow}
              fullWidth
            >
              Accept Order
            </Button>
          )}

          {order.isDelivered === 2 && (
            <Box className={styles.orderStatus}>
              <i className="far fa-check-circle" />
              <Typography>Order Supplied Successfully</Typography>
            </Box>
          )}

          <Dialog
            open={show}
            onClose={() => handleShow(false)}
            className={styles.dialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>
              Confirm Order Supply - #{order._id.slice(-6)}
            </DialogTitle>
            <DialogContent dividers>
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Order Details
                </Typography>
                <Box className={styles.orderInfo}>
                  <Typography variant="body1" gutterBottom>
                    Customer: {order.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Shipping Address: {
                      `${order.shippingAddress.street}, ${order.shippingAddress.city}, 
                      ${order.shippingAddress.country} - ${order.shippingAddress.pincode}`
                    }
                  </Typography>
                  <Typography variant="body2">
                    Amount: {formatCurrency(order.orderAmount)}
                  </Typography>
                </Box>
              </Box>

              <Divider style={{ margin: '24px 0', backgroundColor: '#404040' }} />

              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Order Items
                </Typography>
                {order.orderItems.map((item, index) => (
                  <Box key={index} className={styles.orderInfo}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1">
                        {item.name} [{item.varient}]
                      </Typography>
                      <Typography variant="body2">
                        {item.quantity} × {formatCurrency(item.price)}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <DarkTextField
                autoFocus
                margin="dense"
                label="Supplier Password"
                type="password"
                fullWidth
                variant="outlined"
                value={UIDPass}
                onChange={(e) => setUIDPass(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleShow(false)} color="primary">
                Cancel
              </Button>
              <Button 
                onClick={() => handleClose_withConfirm(order)} 
                color="primary" 
                variant="contained"
                className={styles.acceptButton}
              >
                Confirm Supply
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </CardContent>
    </Card>
  );
}

export default Cardd;