import React, { useEffect } from 'react'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { classNames } from '../../utils/class-names';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

export const VARIANTS = {
  Info: {
    icon: (
      <InformationCircleIcon
        className="h-6 w-6 text-blue-400"
        aria-hidden="true"
      />
    ),
    name: 'Info',
  },
  Error: {
    icon: <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />,
    name: 'Error',
  },
  Warning: {
    icon: (
      <ExclamationCircleIcon
        className="h-6 w-6 text-yellow-400"
        aria-hidden="true"
      />
    ),
    name: 'Warning',
  },
  Success: {
    icon: (
      <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
    ),
    name: 'Success',
  },
}

const ToastMessage = ({
  id,
  header,
  message,
  lifetime,
  onRemove,
  truncate = 'truncate-1-lines',
  icon,
  type,
  title,
}) => {
  const Var = type
    ? VARIANTS[type]
    : {
      icon,
      name: header,
    }
  useEffect(() => {
    if (lifetime && onRemove) {
      setTimeout(() => {
        onRemove(id)
      }, lifetime)
    }
  }, [lifetime])

  return (
    <Alert severity="error" sx={{ width: '100%' }}>
      <div
        style={{ float: 'left' }}
      >
        {title || Var.name}
        :
        {' '}
        {message}
      </div>

      {/* <div
        style={{ float: 'right' }}
      >
        <Button
          onClick={() => {
            onRemove && onRemove(id)
          }}
        >
          <XIcon aria-hidden="true" />
        </Button>
        </div> */}
    </Alert>
  )
}

export default ToastMessage
