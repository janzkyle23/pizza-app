import React, { useState, createContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import Steps, { steps } from './components/Steps';
import SizeScreen from './screens/SizeScreen';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(1),
    },
  })
);

type Size = 'Small' | 'Medium' | 'Large';
type Crust = 'Thin' | 'Thick';
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
  size: Size | null;
  setSize: React.Dispatch<React.SetStateAction<Size | null>>;
  sizePrice: { [name in Size]: number };
  crust: Crust | null;
  setCrust: React.Dispatch<React.SetStateAction<Crust | null>>;
  crustPrice: { [name in Crust]: number };
  toppings: Toppings;
  setToppings: React.Dispatch<React.SetStateAction<Toppings>>;
};

const sizePrice = { Small: 8, Medium: 10, Large: 12 };
const crustPrice = { Thin: 2, Thick: 4 };
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

// declaring the global state. It is partial so that the default value can be omitted
export const OrderContext = createContext<OrderContextProps>({
  activeStep: 0,
  setActiveStep: (): void => {},
  size: null,
  setSize: (): void => {},
  sizePrice,
  crust: null,
  setCrust: (): void => {},
  crustPrice,
  toppings: initialToppings,
  setToppings: (): void => {},
});

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [size, setSize] = useState<Size | null>(null);
  const [crust, setCrust] = useState<Crust | null>(null);
  const [toppings, setToppings] = useState<Toppings>(initialToppings);

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return <SizeScreen />;
      case 1:
        return <SizeScreen />;
      case 2:
        return <SizeScreen />;
      case 3:
        return 'Confirm your order';
      default:
        return 'Unknown stepIndex';
    }
  };

  return (
    <OrderContext.Provider
      value={{
        activeStep,
        setActiveStep,
        size,
        setSize,
        sizePrice,
        crust,
        setCrust,
        crustPrice,
        toppings,
        setToppings,
      }}
    >
      <Grid container>
        <Typography variant='h4' component='h1' align='center' gutterBottom>
          IT'S PIZZA TIME
        </Typography>

        <Steps />

        <Grid item xs={12}>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={handleReset}>Order Again</Button>
            </div>
          ) : (
            <div>
              <div className={classes.instructions}>
                {getStepContent(activeStep)}
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </OrderContext.Provider>
  );
}

export default App;
