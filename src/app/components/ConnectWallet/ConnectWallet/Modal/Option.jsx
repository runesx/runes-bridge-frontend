import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Button,
} from '@mui/material';
import { classNames } from '../../../../utils/class-names';

const Option = ({
  onClick,
  name,
  icon,
  isActive,
  isDisabled,
}) => (
  <Button
    key={name}
    onClick={onClick}
  >
    <div className="flexor">
      <div className="flexorItem">
        {icon}
      </div>

      {isActive && (
      <div className="flexorItem">
        <CheckCircleIcon className="w-5 h-5" />
      </div>
      )}
      <div
        className={classNames(
          'flexorItem text-sm md:text-base',
          isDisabled && 'flexorItem text-gray-500',
        )}
      >
        {name}
      </div>
    </div>
  </Button>
)

export default Option
