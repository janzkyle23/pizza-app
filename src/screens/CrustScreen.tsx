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

export default function CrustScreen() {
  const classes = useStyles();
  const { crust, setCrust, crustPrice } = useContext(OrderContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    // this validation doesn't follow DRY principle but it conforms with TS type analysis
    if (newValue === 'Thin' || newValue === 'Thick') {
      setCrust(newValue);
    }
  };

  const crustsRadio = Object.entries(crustPrice).map(([key, value]) => (
    <FormControlLabel
      value={key}
      key={key}
      control={<Radio />}
      label={`${key} - $${value}`}
    />
  ));

  return (
    <FormControl component='fieldset' className={classes.formControl}>
      <FormLabel component='legend'>Choose crust type</FormLabel>
      <RadioGroup
        aria-label='crusts'
        name='crusts'
        value={crust}
        onChange={handleChange}
      >
        {crustsRadio}
      </RadioGroup>
    </FormControl>
  );
}
