import React, { useState, createContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Steps from './components/Steps';

type Size = null | 'Small' | 'Medium' | 'Large';
type Crust = null | 'Thin' | 'Thick';
type Topping =
  | 'Pepperoni'
  | 'Mushrooms'
  | 'Onions'
  | 'Sausage'
  | 'Bacon'
  | 'Extra cheese'
  | 'Black olives'
  | 'Green peppers'
  | 'Pineapple'
  | 'Spinach';
type Toppings = {
  [name in Topping]: boolean;
};

type OrderContextProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
  crust: Crust;
  setCrust: React.Dispatch<React.SetStateAction<Crust>>;
  toppings: Toppings;
  setToppings: React.Dispatch<React.SetStateAction<Toppings>>;
};

export const OrderContext = createContext<Partial<OrderContextProps>>({});

const initialToppings: Toppings = {
  Pepperoni: false,
  Mushrooms: false,
  Onions: false,
  Sausage: false,
  Bacon: false,
  'Extra cheese': false,
  'Black olives': false,
  'Green peppers': false,
  Pineapple: false,
  Spinach: false,
};

function App() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [size, setSize] = useState<Size>(null);
  const [crust, setCrust] = useState<Crust>(null);
  const [toppings, setTopping] = useState<Toppings>(initialToppings);

  return (
    <Grid container>
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        IT'S PIZZA TIME
      </Typography>
      <OrderContext.Provider value={{ activeStep, setActiveStep }}>
        <Steps />
      </OrderContext.Provider>
    </Grid>
  );
}

export default App;
