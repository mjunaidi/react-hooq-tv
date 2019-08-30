import React from 'react'
import {CssBaseline} from '@material-ui/core'
import Navbar from './Navbar'
import Main from './Main'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'animate.css'
import '../style.css'

export default function Body(props) {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Main />
      <Footer />
    </>
  )
}
