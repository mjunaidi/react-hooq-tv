import React from 'react'
import {Typography,Link} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Constant from '../Constant'

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        {Constant.name}
      </Link>{' '}
      {new Date().getFullYear()}
      {'. Built with '}
      <Link color="inherit" href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
        Material-UI
      </Link>
    </Typography>
  )
}

export default function Footer(props) {
  const classes = useStyles()
  return (
    <footer className={`${classes.footer} animated fadeIn slowest`}>
      <p className="text-center text-sm text-muted">{Constant.disclaimer}</p>
      <Copyright />
    </footer>
  )
}
