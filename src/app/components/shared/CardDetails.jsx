import React from 'react';
import CardDetail from './CardDetail'

export const CardDetails = ({ details }) => (
  <div className="flex flex-wrap justify-between gap-y-3">
    {details.map((x, idx) => (
      <CardDetail
        key={x.title}
        title={x.title}
        value={x.value}
        tooltip={x.tooltip}
        right={idx % 2 !== 0}
      />
    ))}
  </div>
)
