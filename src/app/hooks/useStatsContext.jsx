import React, { useContext } from 'react'

import { StatsContext } from '../context/stats'

export const useStatsContext = () => useContext(StatsContext)
