import React from 'react'
import {Typography,Toolbar,AppBar} from '@material-ui/core'
//import {CameraIcon} from '@material-ui/icons'
import {LiveTv} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Constant from '../Constant'

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}))

export default function Navbar(props) {
  const classes = useStyles()
  return (
    <AppBar position="relative" color="secondary">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className={classes.icon}>
          <img src={Constant.logo} alt={Constant.name} />
        </Typography>
        <LiveTv />
      </Toolbar>
    </AppBar>
  )
}
