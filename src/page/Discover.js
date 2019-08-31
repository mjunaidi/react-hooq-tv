import React from 'react'
import {Link} from 'react-router-dom'
import {Button,Chip,Card,CardActions,CardContent,CardMedia,Grid,Typography,Container,Select,MenuItem,CircularProgress} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {MovieFilter,AvTimer} from '@material-ui/icons'
import DataService from '../component/DataService'
import Meta from '../component/Meta'
import Constant from '../Constant'

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}))

const TYPE = 'Multi-Title-Spotlight'
const POSTER = 'POSTER'

export default function Discover(props) {
  const classes = useStyles()

  const [data,setData] = React.useState()
  const [init,setInit] = React.useState(false)
  const [region,setRegion] = React.useState(localStorage.getItem('region')||'ID')

  React.useEffect(()=>{
    if (!init) {
      function handleErr(e) {

      }

      DataService.discover({region},res=>{
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
  }, [init,region])

  React.useEffect(()=>{
    localStorage.setItem('region',region)
    setInit(false)
    setData(null)
  }, [region])

  const renderRegionSelect = ()=>{
    return (
      <Select value={region} onChange={e=>setRegion(e.target.value)}>
        {
          Constant.regions.map((e,i)=>{
            const {value,label,flag} = e
            return (
              <MenuItem key={i} value={value}><span className="mr-2">{flag}</span>{label}</MenuItem>
            )
          })
        }
      </Select>
    )
  }

  const renderData = ()=>{
    if (typeof(data)==='object'&&data!==null&&typeof(data.data)==='object'&&data.data!==null) {
      const list = data.data
      if (Array.isArray(list)&&list.length>0) {
        return (
          <Container className={classes.cardGrid} maxWidth="md">

            <Grid container spacing={2} className="animated slideInDown">
              <Grid item xs={6}>
                <h1 className="mb-3">Discover<MovieFilter className="ml-2" style={{fontSize:'larger'}} /></h1>
              </Grid>
              <Grid item xs={6}>
                <div className="float-right">{renderRegionSelect()}</div>
              </Grid>
            </Grid>

            <Grid container spacing={4}>
              {list.filter(e=>e.type===TYPE).map((e,i)=>{
                if (typeof(e)==='object'&&e!==null) {
                  const {data} = e
                  if (Array.isArray(data)&&data.length>0) {
                    return data.map((e,i)=>{
                      const {id,title,images,meta={},running_time_friendly} = e

                      const renderMedia = images=>{
                        if (Array.isArray(images)&&images.length>0) {
                          const poster = images.filter(e=>e.type===POSTER)[0]
                          if (typeof(poster)==='object'&&poster!==null) {
                            const {url} = poster
                            if (typeof(url)==='string'&&url.length>0) {
                              return (
                                <Link to={`/view/${id}`}>
                                  <CardMedia
                                    className={classes.cardMedia}
                                    image={url}
                                    title={title}
                                  />
                                </Link>
                              )
                            }
                          }
                        }
                      }

                      return (
                        <Grid item key={i} xs={12} sm={6} md={4} className={`animated flipInY`}>
                          <Card className={classes.card}>
                            {renderMedia(images)}
                            <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
                              <Meta {...meta} className="mb-2" />
                              {running_time_friendly&&<Chip avatar={<AvTimer />} className="mr-2 shadow animated bounceInUp" label={running_time_friendly} variant="outlined" />}
                            </CardContent>
                            <CardActions>
                              <Link to={`/view/${id}`}>
                                <Button size="small" color="primary">View</Button>
                              </Link>
                            </CardActions>
                          </Card>
                        </Grid>
                      )
                    })
                  }
                }
                return null
              })}
            </Grid>
          </Container>
        )
      }
    }
    return (
      <div className="container text-center">
        <CircularProgress className="m-5" />
      </div>
    )
  }

  return (
    <main>
      {renderData()}
    </main>
  )
}
