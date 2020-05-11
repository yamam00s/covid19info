import React, { FC } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'
import { ClientHazard } from 'services/models/hazard'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 320,
    }
  }),
)

type SelectFormProps = {
  hazards: ClientHazard[]
  value: string
  handleChange: (event: React.ChangeEvent<{
    value: string;
  }>) => void
}

const SelectForm: FC<{ selectFormProps: SelectFormProps}> = ({
  selectFormProps
}) => {
  const classes = useStyles()
  selectFormProps
  const { hazards, value, handleChange } = selectFormProps

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">
        {value}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
      >
        {hazards.map(hazard => (
          <MenuItem value={hazard.key}>
            {hazard.region}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select Region</FormHelperText>
    </FormControl>
  )
}

export default SelectForm
