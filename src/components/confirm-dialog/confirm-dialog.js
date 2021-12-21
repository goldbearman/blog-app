import React from 'react';
// MATERIAL UI
import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import classes from '../article/article.module.scss';


const ConfirmDialog = (props) => {
  const { onClose, open } = props;

  const handleButtonClick = (value) => {
    onClose(value);
  };

  return (
    open
    && (
      <div className={classes.dialogWindow}>
        <p>Are you sure to delete this article?</p>
        <Button className={classes.buttonDialog} onClick={handleButtonClick}>No</Button>
        <Button className={classes.buttonDialog} onClick={() => handleButtonClick('delete')} autoFocus>
          Yes
        </Button>

      </div>
    )
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

ConfirmDialog.defaultProps = {
  open: false,
  onClose: () => {},
};

export default ConfirmDialog;
