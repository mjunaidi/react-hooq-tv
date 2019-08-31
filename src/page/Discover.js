import React from 'react'
import {Link} from 'react-router-dom'
import {Button,Card,CardActions,CardContent,CardMedia,Grid,Typography,Container,Select,MenuItem} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DataService from '../component/DataService'
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

            <div className="float-right">{renderRegionSelect()}</div>

            <h1 className="mb-3">Discover</h1>

            <Grid container spacing={4}>
              {list.filter(e=>e.type===TYPE).map((e,i)=>{
                if (typeof(e)==='object'&&e!==null) {
                  const {data} = e
                  if (Array.isArray(data)&&data.length>0) {
                    return data.map((e,i)=>{
                      const {id,title,images} = e

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
                        <Grid item key={i} xs={12} sm={6} md={4}>
                          <Card className={classes.card}>
                            {renderMedia(images)}
                            <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                {title}
                              </Typography>
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
  }

  return (
    <main>
      {renderData()}
    </main>
  )
}
