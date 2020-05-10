import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ClientHazard } from 'services/models/hazard'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: '30px',
  },
  title: {
    fontSize: 14,
  },
})

const HazardMain: FC<{ hazard: ClientHazard }>= ({ hazard }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {hazard.region}
        </Typography>
        <Typography variant="body2" component="p">
          本日の感染者: {hazard.todayInfection}
          <br />
          前日比: {hazard.comparisonYesterday}
          <br />
          合計: {hazard.totalInfection}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default HazardMain
