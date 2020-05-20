import React, { useContext } from 'react';
import { OrderContext } from '../App';
import Typography from '@material-ui/core/Typography';

export default function SummaryScreen() {
  const { size, crust, toppings, sizePrice, crustPrice } = useContext(
    OrderContext
  );

  const toppingsSelected = Object.entries(toppings).filter(([_, val]) => val);
  const toppingsCount = toppingsSelected.length;
  const toppingsList = toppingsSelected.map(([topping]) => (
    <ul key={topping}>{topping}</ul>
  ));
  // const chosenToppings = Object.entries(toppings).reduce((chosen, [topping, isChosen]!) => {
  //   if (isChosen) {
  //     chosen.push(<div>{topping}</div>)
  //     return chosen
  //   }
  // }, [])
  const total =
    sizePrice[size!] +
    crustPrice[crust!] +
    (toppingsCount > 3 ? (toppingsCount - 3) * 0.5 : 0);

  return (
    <div>
      <Typography>Order Summary</Typography>
      <div>Size: {size}</div>
      <div>Crust type: {crust}</div>
      <div>
        Toppings: <ul>{toppingsList}</ul>
      </div>
      <div>Total: {total}</div>
    </div>
  );
}
