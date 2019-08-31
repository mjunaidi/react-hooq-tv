import React from 'react'
import {Link} from 'react-router-dom'
import {CircularProgress,Chip} from '@material-ui/core'
import {ArrowBack,Movie,AvTimer,CloudDownload,ViewStream,Category,Language} from '@material-ui/icons'
import DataService from '../component/DataService'
import Meta from '../component/Meta'

export default function View(props) {

  const {match} = props

  const [init,setInit] = React.useState(false)
  const [data,setData] = React.useState()

  React.useEffect(()=>{
    if (!init) {
      if (typeof(match)==='object'&&match!==null) {
        const {params} = match
        if (typeof(params)==='object'&&params!==null) {
          const {id} = params
          if (typeof(id)==='string'&&id.length>0) {

            const handleErr = err=>{

            }

            DataService.details({id}, res=>{
              if (res.ok) {
                res.json().then(data=>{
                  if (typeof(data)==='object'&&data!==null) {
                    setData(data)
                  }
                }).catch(handleErr)
              }
              setInit(true)
            }, handleErr)
          }
        }
      }
    }
  }, [init,match])

  if (typeof(data)==='object'&&data!==null) {
    if (typeof(data.data)==='object'&&data.data!==null) {
      const {title,description,as,languages,streamable,downloadable,running_time_friendly,images,tags,meta={}} = data.data

      const renderBackground = images=>{
        if (Array.isArray(images)&&images.length>0) {
          const e = images.find(e=>e.type==='BACKGROUND')
          if (typeof(e)==='object'&&e!==null) {
            const {url} = e
            return (
              <div className="mb-3 rounded shadow animated flipInY delay-1s">
                <img src={url} alt={title} className="w-100" />
              </div>
            )
          }
        }
        return null
      }

      const renderSpotlight = images=>{
        if (Array.isArray(images)&&images.length>0) {
          const e = images.find(e=>e.type==='SPOTLIGHT')
          if (typeof(e)==='object'&&e!==null) {
            const {url} = e
            return (
              <div className="mb-3 rounded shadow animated flipInY delay-2s">
                <img src={url} alt={title} className="w-100" />
              </div>
            )
          }
        }
        return null
      }

      return (
        <div className="container mb-5">
          <div className="mb-3 mt-3 animated slideInDown">
            <Link to="/" className="text-dark"><ArrowBack className="mr-2" />Back</Link>
          </div>

          {renderBackground(images)}

          <div className="mb-3"><Meta {...meta} className="mb-2" /></div>

          <h1 className="mb-3 animated lightSpeedIn">{title}</h1>

          <div className="mb-3">
            <Chip avatar={<Movie className="m-1" />} variant="outlined"  label={as} className="mr-2 shadow animated bounceInUp" />
            {running_time_friendly&&<Chip avatar={<AvTimer />} className="mr-2 shadow animated bounceInUp" label={running_time_friendly} variant="outlined" />}
          </div>

          <div className="mb-3 animated fadeIn slower">
            <Category className="mr-2" />
            {tags.map((e,i)=>{
              const {label} = e
              return (
                <Chip key={i} label={label} variant="outlined" color="secondary" className={`mr-2 shadow`} />
              )
            })}
          </div>

          {Array.isArray(languages)&&languages>0&&<div className="mb-3 animated fadeInUp slower">
            <Language className="mr-2" />
            {
              languages.map((e,i)=>(
                <Chip key={i} label={e} variant="outlined" color="primary" className="mr-2 shadow" />
              ))
            }
          </div>}

          <p className="mb-3 animated fadeIn">{description}</p>

          {renderSpotlight(images)}

          <div className="mb-3">
            {downloadable&&<Chip className="mr-2 shadow" avatar={<CloudDownload className="m-1" />} label="Downloadable" variant="outlined" />}
            {streamable&&<Chip className="mr-2 shadow" avatar={<ViewStream className="m-1" />} label="Streamable" variant="outlined" />}
          </div>
        </div>
      )
    }
  }

  return (
    <div className="container text-center">
      <CircularProgress className="m-5" />
    </div>
  )
}
