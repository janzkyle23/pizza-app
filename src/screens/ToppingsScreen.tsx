import React, { useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { OrderContext } from '../App';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);

export default function CheckboxesGroup() {
  const classes = useStyles();
  const { toppings, setToppings } = useContext(OrderContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToppings({ ...toppings, [event.target.name]: event.target.checked });
  };

  const toppingsCheckbox = Object.entries(toppings).map(([key, value]) => (
    <div key={key}>
      <FormControlLabel
        control={
          <Checkbox checked={value} onChange={handleChange} name={key} />
        }
        label={key}
      />
    </div>
  ));

  return (
    <div className={classes.root}>
      <FormControl component='fieldset' className={classes.formControl}>
        <FormLabel component='legend'>Pick your toppings</FormLabel>
        <FormGroup>{toppingsCheckbox}</FormGroup>
        <FormHelperText>
          You may choose up to 3 toppings for free. Each additional topping
          costs $0.50
        </FormHelperText>
      </FormControl>
    </div>
  );
}
