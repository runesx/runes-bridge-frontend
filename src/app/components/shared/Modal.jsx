import React, { useState, useRef } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { classNames } from '../../utils/class-names';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Modals = ({
  open,
  closeModal,
  children,
  noPadding,
}) => {
  const [isPending, setIsPending] = useState(false)
  const cancelButtonRef = useRef()

  return (
    <Modal
      initialFocus={cancelButtonRef}
      open={open}
      onClose={() => {
        if (!isPending) {
          closeModal()
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {children({ cancelButtonRef, isPending, setIsPending })}
      </Box>
    </Modal>
  )
}

export const ModalTitle = ({
  children,
  className,
  closeModal,
  cancelButtonRef,
  isPending = false,
}) => (
  <div className={classNames('flex justify-between items-center', className)}>
    <div>{children}</div>
    <Button
      variant="contained"
      onClick={() => {
        if (!isPending) {
          closeModal()
        }
      }}
      ref={cancelButtonRef}
    >
      {!isPending && <XIcon className="w-6 h-6" />}
    </Button>
  </div>
)

export default Modals;
