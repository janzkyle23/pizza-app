import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { OrderContext } from '../App';

interface ModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmed: boolean;
  setIsConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal(props: ModalProps) {
  const { openModal, isConfirmed, setOpenModal, setIsConfirmed } = props;
  const { setActiveStep } = useContext(OrderContext);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleReset = () => {
    setOpenModal(false);
    setIsConfirmed(false);
    setActiveStep(0);
  };

  const [title, text] = isConfirmed
    ? ['Your order is successful!', 'Do you want to order again?']
    : [
        'Ordering failed',
        'Please try to click Confirm button again to resend your order',
      ];

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Back
          </Button>
          {isConfirmed && (
            <Button onClick={handleReset} color='primary' variant='outlined'>
              Order Again
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
