/* eslint-disable import/prefer-default-export */
import React from 'react';
import Typography from '@mui/material/Typography';
import { ModalTitle } from '../../../shared/Modal';

export const CardModalTitle = ({
  children,
  closeModal,
  logo,
  title,
  ...rest
}) => (
  <ModalTitle
    closeModal={closeModal}
    {...rest}
  >
    <div>
      <img src={logo} alt={title} width="36" />
      <Typography
        variant="h6"
        className="underlineText"
        gutterBottom
      >
        {children}
      </Typography>
    </div>
  </ModalTitle>
)
