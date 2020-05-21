import React, { useContext } from 'react';
import { OrderContext } from '../App';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

export default function SizeScreen() {
  const classes = useStyles();
  const { size, setSize, sizePrice } = useContext(OrderContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    // this validation doesn't follow DRY principle but it conforms with TS type analysis
    if (newValue === 'Small' || newValue === 'Medium' || newValue === 'Large') {
      setSize(newValue!);
    }
  };

  const sizesRadio = Object.entries(sizePrice).map(([key, value]) => (
    <FormControlLabel
      value={key}
      key={key}
      control={<Radio />}
      label={`${key} - $${value}`}
    />
  ));

  return (
    <FormControl component='fieldset' className={classes.formControl}>
      <FormLabel component='legend'>Choose pizza size</FormLabel>
      <RadioGroup
        aria-label='sizes'
        name='sizes'
        value={size}
        onChange={handleChange}
      >
        {sizesRadio}
      </RadioGroup>
    </FormControl>
  );
}
