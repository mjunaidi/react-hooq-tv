import React from 'react'

export default function Gallery(props) {
  const {list,className=''} = props
  if (Array.isArray(list)&&list.length>0) {
    return (
      <div className={`Gallery ${className}`}>
        {list.map((e,i)=>{
          const {url,type} = e
          return (
            <img key={i} src={url} alt={type} />
          )
        })}
      </div>
    )
  }
  return null
}
