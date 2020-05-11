import React, { FC, useState, useEffect } from 'react'
import { ClientHazard } from 'services/models/hazard';
import HazardMain from 'components/Hazard'
import SelectForm from 'components/Hazard/SelectForm'

const HazardContainer: FC<{ hazards: ClientHazard[] }>= ({ hazards })=> {
  const [hazard, setHazard] = useState<ClientHazard>(hazards[0])
  const tokyo = [...hazards].find(hazard => hazard.key === 'tokyo')

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    const selected = hazards.find(hazard => hazard.key === event.target.value)
    setHazard(selected)
  }

  useEffect(() => {
    setHazard(tokyo)
  }, [])

  const selectForm = { hazards, value: hazard.key, handleChange }

  return (
    <>
      <SelectForm selectFormProps={selectForm} />
      <HazardMain hazard={hazard} />
    </>
  )
}

export default HazardContainer
