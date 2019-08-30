import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Discover from '../page/Discover'
import View from '../page/View'

export default function Main(props) {
  return (
    <main role="main">
      <Switch>
        <Route exact path="/" component={Discover} />
        <Route exact path="/view/:id" component={View} />
      </Switch>
    </main>
  )
}
