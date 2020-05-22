export type Size = 'Small' | 'Medium' | 'Large';

export type Crust = 'Thin' | 'Thick';

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
export type Toppings = {
  [name in Topping]: boolean;
};

export type OrderContextProps = {
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
