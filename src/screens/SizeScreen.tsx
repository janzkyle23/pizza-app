import React, { useContext } from 'react';
import { OrderContext } from '../App';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';

const SizeScreen = () => {
  const { size, setSize, sizePrice } = useContext(OrderContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;

    // this validation doesn't follow DRY principle but it conforms with TS type analysis
    if (newValue === 'Small' || newValue === 'Medium' || newValue === 'Large') {
      setSize(newValue);
    } else {
      console.error('size input error');
      setSize(null);
    }
  };

  const sizes = Object.entries(sizePrice).map(([key, value]) => (
    <div key={key}>
      <FormControlLabel value={key} control={<Radio />} label={key} />
      {value}
    </div>
  ));

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Size</FormLabel>
      <RadioGroup
        aria-label='sizes'
        name='sizes'
        value={size}
        onChange={handleChange}
      >
        {sizes}
      </RadioGroup>
    </FormControl>
  );
};

export default SizeScreen;
