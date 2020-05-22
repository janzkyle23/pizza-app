import React, { useState, createContext, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Backdrop } from '@material-ui/core';
import Steps, { steps } from './components/Steps';
import Loader from './components/Loader';
import Modal from './components/Modal';
import SizeScreen from './screens/SizeScreen';
import CrustScreen from './screens/CrustScreen';
import ToppingsScreen from './screens/ToppingsScreen';
import SummaryScreen from './screens/SummaryScreen';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      margin: theme.spacing(2, 0),
    },
    form: {
      padding: theme.spacing(0, 3),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    screen: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
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

// declaring the global state
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

export default function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [size, setSize] = useState<Size | null>(null);
  const [crust, setCrust] = useState<Crust | null>(null);
  const [toppings, setToppings] = useState<Toppings>(initialToppings);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const toppingsSelected: string[] = [];
  Object.entries(toppings).forEach(([topping, isSelected]) => {
    if (isSelected) {
      toppingsSelected.push(topping);
    }
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleNextDisable = () => {
    switch (activeStep) {
      case 0:
        return !size;
      case 1:
        return !crust;
      default:
        return false;
    }
  };
  const handleConfirmDisable = () => isConfirmed || !size || !crust;
  const handleConfirm = () => {
    setOpenBackdrop(true);
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ size, crust, toppings: toppingsSelected }),
    }).then((res) => {
      if (res.ok) {
        setIsConfirmed(true);
      }
      setOpenBackdrop(false);
      setOpenModal(true);
    });
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <SizeScreen />;
      case 1:
        return <CrustScreen />;
      case 2:
        return <ToppingsScreen />;
      case 3:
        return <SummaryScreen />;
      default:
        return <React.Fragment />;
    }
  };

  // reset chosen toppings when size changes to avoid exceeding max toppings per size
  useEffect(() => {
    setToppings(initialToppings);
  }, [size]);

  // automatic step increment after choosing a size or crust
  const isFirstUpdate = useRef(true);
  useEffect(() => {
    if (isFirstUpdate.current) {
      isFirstUpdate.current = false;
    } else {
      setTimeout(() => {
        handleNext();
      }, 100);
    }
  }, [size, crust]);

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
      <Container maxWidth='md' className={classes.root}>
        <Typography
          variant='h4'
          component='h1'
          align='center'
          className={classes.title}
        >
          IT'S PIZZA TIME
        </Typography>
        <Steps />
        <div className={classes.form}>
          <div className={classes.screen}>{getStepContent()}</div>
          <div className={classes.buttons}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.backButton}
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant='contained'
                color='primary'
                onClick={handleConfirm}
                disabled={handleConfirmDisable()}
              >
                Confirm
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                disabled={handleNextDisable()}
              >
                Next
              </Button>
            )}
          </div>
        </div>
        <Backdrop className={classes.backdrop} open={openBackdrop}>
          <Loader />
        </Backdrop>
        {openModal && (
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            isConfirmed={isConfirmed}
            setIsConfirmed={setIsConfirmed}
          />
        )}
      </Container>
    </OrderContext.Provider>
  );
}
