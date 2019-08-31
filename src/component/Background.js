import React from 'react'

export default function Background(props) {
  const {className=''} = props
  return <div className={`bg ${className}`} />
}
