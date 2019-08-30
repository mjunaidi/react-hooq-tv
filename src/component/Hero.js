import React from 'react'
import {Button,Grid,Typography,Container} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}))

function renderBtn(e,color) {
  if (typeof(e)==='object'&&e!==null) {
    const {label,onClick} = e
    if (typeof(label)==='string'&&label.length>0&&typeof(onClick)==='function') {
      return (
        <Button variant="contained" color={color} onClick={onClick}>{label}</Button>
      )
    }
  }
}

export default function Hero(props) {
  const classes = useStyles()
  const {title='',lead='',primary,secondary} = props
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {lead}
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              {renderBtn(primary,'primary')}
            </Grid>
            <Grid item>
              {renderBtn(secondary,'secondary')}
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  )
}
