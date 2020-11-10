import React, { useState } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

const Pocetna = () => (
  <div>
    <h2>OARWA - Poruke app</h2>
    <p> Opis aplikacije</p>
  </div>
)

const Poruke = () => (
  <div>
    <h2>Poruke</h2>
    <p>Popis poruka</p>
  </div>
)

const Korisnici = () => (
  <div>
    <h2>Korisnici</h2>
    <p>Popis korisnika</p>
  </div>
)

const App = () => {
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>pocetna</Link>
        <Link style={padding} to='/poruke'>poruke</Link>
        <Link style={padding} to='/korisnici'>korisnici</Link>
      </div>

      <Switch>
        <Route path='/poruke'>
          <Poruke />
        </Route>
        <Route path='/korisnici'>
          <Korisnici />
        </Route>
        <Route path='/'>
          <Pocetna />
        </Route>
      </Switch>
    </Router>
  )
}

export default App