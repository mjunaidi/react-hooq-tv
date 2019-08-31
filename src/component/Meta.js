import React from 'react'
import {Chip} from '@material-ui/core'

export default function Meta(props) {
  const {releaseYear,ageRating} = props
  return (
    <>
      <Chip label={releaseYear} className="mr-2 mb-2 shadow animated bounceIn" color="primary" />
      <Chip label={ageRating} className="mr-2 mb-2 shadow animated bounceIn" color="secondary" />
    </>
  )
}
