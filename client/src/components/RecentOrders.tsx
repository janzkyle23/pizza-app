import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  ListItem,
  ListItemText,
  List,
  DialogContent,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: theme.spacing(3),
    },
    button: {
      display: 'flex',
    },
  })
);

type recentOrder = {
  _id: string;
  size: string;
  crust: string;
  toppings?: string[];
  amount: number;
};

export default function RecentOrders() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<recentOrder[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then(
        (result) => setRecentOrders(result),
        (error) => console.log(error)
      );
  }, []);

  const ordersList = recentOrders.map((order) => (
    <ListItem key={order._id}>
      <ListItemText>
        {`${order.size} - ${order.crust} - ${
          order.toppings && order.toppings.join(', ')
        } - $${order.amount}`}
      </ListItemText>
    </ListItem>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.button}>
        <Button variant='outlined' color='primary' onClick={handleClickOpen}>
          View Recent Orders
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Recent Orders</DialogTitle>
        <DialogContent dividers>
          <List>{ordersList}</List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
