import React, { useContext } from 'react';
import { OrderContext } from '../App';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import RecentOrders from '../components/RecentOrders';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(3, 0),
    },
    noBorderBottom: {
      borderBottom: 'none',
    },
    bold: {
      fontWeight: 'bold',
    },
  })
);

export default function SummaryScreen() {
  const classes = useStyles();
  const { size, crust, toppings, sizePrice, crustPrice } = useContext(
    OrderContext
  );

  const toppingsSelected = Object.entries(toppings).filter(([_, val]) => val);
  const toppingsCount = toppingsSelected.length;

  const sizeAmount = sizePrice[size!];
  const crustAmount = crustPrice[crust!];
  const toppingsAmount = toppingsCount > 3 ? (toppingsCount - 3) * 0.5 : 0;
  const total = sizeAmount + crustAmount + toppingsAmount;

  const toppingsTable = toppingsSelected.map(([topping], index) => {
    const isBottom = index === toppingsCount - 1;
    if (index === 0) {
      return (
        <TableRow key={topping}>
          <TableCell className={clsx(!isBottom && classes.noBorderBottom)}>
            Toppings
          </TableCell>
          <TableCell className={clsx(!isBottom && classes.noBorderBottom)}>
            {topping}
          </TableCell>
          <TableCell
            className={clsx(!isBottom && classes.noBorderBottom)}
            align='right'
          >
            ${toppingsAmount}
          </TableCell>
        </TableRow>
      );
    } else {
      return (
        <TableRow key={topping}>
          {index === 1 && <TableCell rowSpan={toppingsCount - 1} />}
          <TableCell
            className={clsx(!isBottom && classes.noBorderBottom)}
            colSpan={2}
          >
            {topping}
          </TableCell>
        </TableRow>
      );
    }
  });

  return (
    <Grid item xs={12} className={classes.root}>
      <RecentOrders />
      <Typography component='h2' variant='h6' align='center'>
        Order Summary
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Details</TableCell>
            <TableCell align='right'>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key='size'>
            <TableCell>Size</TableCell>
            <TableCell>{size}</TableCell>
            <TableCell align='right'>${sizeAmount}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Crust</TableCell>
            <TableCell>{crust}</TableCell>
            <TableCell align='right'>${crustAmount}</TableCell>
          </TableRow>
          {toppingsTable}
          <TableRow>
            <TableCell
              colSpan={2}
              align='right'
              className={clsx(classes.noBorderBottom, classes.bold)}
            >
              Total
            </TableCell>
            <TableCell
              align='right'
              className={clsx(classes.noBorderBottom, classes.bold)}
            >
              ${total}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
}
