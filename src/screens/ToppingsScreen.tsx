import React, { useContext, useState } from 'react';
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

function ToppingsScreen() {
  const classes = useStyles();
  const { toppings, setToppings, size } = useContext(OrderContext);
  const [showError, setShowError] = useState(false);

  const maxToppings = {
    Small: 5,
    Medium: 7,
    Large: 9,
  };
  // size should be checked as truthy because its type includes null
  const errorMsg =
    size &&
    `You can only choose up to ${
      maxToppings[size]
    } toppings for a ${size.toLowerCase()} pizza`;

  const toppingsCount = Object.values(toppings).filter((v) => v).length;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    if (isChecked && size && toppingsCount >= maxToppings[size]) {
      setShowError(true);
    } else {
      setToppings({ ...toppings, [event.target.name]: event.target.checked });
      if (showError) setShowError(false);
    }
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
      <FormControl
        error={showError}
        component='fieldset'
        className={classes.formControl}
      >
        <FormLabel component='legend'>Pick your toppings</FormLabel>
        <FormHelperText>
          You may choose up to 3 toppings for free. Each additional topping
          costs $0.50
        </FormHelperText>
        <FormGroup>{toppingsCheckbox}</FormGroup>
        {showError && <FormHelperText>{errorMsg}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default ToppingsScreen;
