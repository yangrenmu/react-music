import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from '../components/Header/Header.js'
import Recommends from '../components/Recommends/Recommends.js'
import Songs from '../components/Songs/Songs.js'
import Radios from '../components/Radios/Radios.js'
import Rankings from '../components/Rankings/Rankings.js'
import Album from '../components/Album/Album.js'

export default class Routers extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Recommends} />
              <Route path="/recommends" component={Recommends} />
              <Route path="/songs" component={Songs} />
              <Route path="/radios" component={Radios} />
              <Route path="/rankings" component={Rankings} />
              <Route path="/album" component={Album} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
