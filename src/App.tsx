import React, { useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import Steps from './components/Steps';

type Size = 'Small' | 'Medium' | 'Large';
type Crust = 'Thin' | 'Thick';
type Ingredient =
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
type Ingredients = {
  [name in Ingredient]: boolean;
};

const ingredients: Ingredients = {
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
  const [size, setSize] = useState<Size | null>(null);
  const [crust, setCrust] = useState<Crust | null>(null);
  const [toppings, setTopping] = useState<Ingredients>(ingredients);

  return (
    <Grid container>
      <Typography variant='h4' component='h1' align='center' gutterBottom>
        IT'S PIZZA TIME
      </Typography>
      <Steps />
    </Grid>
  );
}

export default App;
