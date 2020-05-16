import React, { FC } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  title: {
    flexGrow: 1
  },
  contents: {
    marginTop: '30px'
  }
}))

const Layout: FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            covid19info
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.contents}>
        {children}
      </div>
    </div>
  )
}

export default Layout
