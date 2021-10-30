import React from 'react';
import {
  Button,
  Grid,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import { classNames } from '../../../utils/class-names';

const NumberInputWithMax = ({
  title,
  value,
  onChange,
  onMax,
  error = false,
  typeOfAmount,
}) => (
  <>
    <Grid item xs={12}>
      <label
        className="block mt-4 my-2 uppercase font-bold text-sm text-gray-400 tracking-wider"
        htmlFor="amount"
      >
        {title}
      </label>
    </Grid>
    <Grid item xs={10}>
      <FormControl>
        <FilledInput
          id="filled-adornment-weight"
          type="number"
          required
          placeholder={0}
          value={value}
          onChange={onChange}
          InputProps={{
            inputProps: {
              min: 0,
              'aria-label': 'weight',
            },
          }}
          endAdornment={(
            <InputAdornment position="end">
              {' '}
              <div
                className={classNames(
                  error
                    ? 'bg-red-900 bg-opacity-20 border border-l-0 border-red-400 text-red-400'
                    : 'bg-gray-700 text-gray-400',
                )}
              >
                {typeOfAmount}
              </div>
            </InputAdornment>
)}
          aria-describedby="filled-weight-helper-text"
        />
        <FormHelperText id="filled-weight-helper-text">Amount</FormHelperText>
      </FormControl>
    </Grid>
    <Grid item xs={2}>
      <Button
        type="button"
        onClick={onMax}
        varian="outlined"
        fullWidth
      >
        Max
      </Button>
    </Grid>

    {error ? <div className="text-red-400 mt-2">{error}</div> : null}
  </>
)

export default NumberInputWithMax
