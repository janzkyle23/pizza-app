import React from 'react';
import { makeStyles, CircularProgress, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  loader: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    WebkitTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
  },
}));

export default function Loader() {
  const classes = useStyles();
  
  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );
};
