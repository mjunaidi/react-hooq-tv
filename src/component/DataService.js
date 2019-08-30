export const VERSION = 'v1.2'

export default class DataService {
  static discover(value,cb,cbe) {
    if (typeof(value)==='object'&&value!==null) {
      const {version=VERSION,region,page=1,perPage=5} = value
      const url = `https://cdn-discover.hooq.tv/${version}/discover/feed?region=${region}&page=${page}&perPage=${perPage}`
      fetch(url, {
        mode: 'cors',
      }).then(res=>{
        if (typeof(cb)==='function') cb(res)
      }).catch(err=>{
        if (typeof(cbe)==='function') cbe(err)
      })
    }
  }

  static details(value,cb,cbe) {
    if (typeof(value)==='object'&&value!==null) {
      const {version=VERSION,id} = value
      const url = `https://cdn-discover.hooq.tv/${version}/discover/titles/${id}`
      fetch(url, {
        mode: 'cors',
      }).then(res=>{
        if (typeof(cb)==='function') cb(res)
      }).catch(err=>{
        if (typeof(cbe)==='function') cbe(err)
      })
    }
  }
}
