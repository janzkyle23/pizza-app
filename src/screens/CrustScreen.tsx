import React, { useContext } from 'react';
import { OrderContext } from '../App';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core';

const CrustScreen = () => {
  const { crust, setCrust, crustPrice } = useContext(OrderContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    // this validation doesn't follow DRY principle but it conforms with TS type analysis
    if (newValue === 'Thin' || newValue === 'Thick') {
      setCrust(newValue);
    } else {
      console.error('crust input error');
      setCrust(null);
    }
  };

  const crustsRadio = Object.entries(crustPrice).map(([key, value]) => (
    <div key={key}>
      <FormControlLabel value={key} control={<Radio />} label={key} />
      {value}
    </div>
  ));

  return (
    <FormControl component='fieldset'>
      <FormLabel component='legend'>Crust</FormLabel>
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
};

export default CrustScreen;
