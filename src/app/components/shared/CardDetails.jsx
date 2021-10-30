/* eslint-disable import/prefer-default-export */
import React from 'react';
import CardDetail from './CardDetail'

export const CardDetails = ({ details }) => (
  <>
    {details.map((x, idx) => (
      <CardDetail
        key={x.title}
        title={x.title}
        value={x.value}
        tooltip={x.tooltip}
        right={idx % 2 !== 0}
      />
    ))}
  </>
)
