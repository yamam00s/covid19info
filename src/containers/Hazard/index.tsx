import React, { FC, useState, useEffect } from 'react'
import { ClientHazard } from 'services/models/hazard';
import HazardMain from 'components/Hazard'

const HazardContainer: FC<{ hazards: ClientHazard[] }>= ({ hazards })=> {
  const [hazard, setHazard] = useState<ClientHazard>(hazards[0])

  useEffect(() => {
    setHazard(hazards[0])
  }, [])

  return <HazardMain hazard={hazard} />
}

export default HazardContainer
