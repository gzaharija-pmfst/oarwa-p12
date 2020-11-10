import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'

const Pocetna = () => (
  <div>
    <h2>OARWA - Poruke app</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vel libero ac nulla scelerisque egestas. Praesent tempus sagittis risus pulvinar varius. In auctor ultricies lacinia. Pellentesque ac finibus nisl. Morbi ac nisi nec ligula rhoncus fringilla. Fusce mattis eros at justo scelerisque aliquet. Quisque consequat elit lacus, at viverra massa lobortis et. Nunc fringilla elit non fringilla consequat. In gravida faucibus lorem sed pulvinar. Aenean vulputate nunc at nisi porttitor hendrerit. Cras urna lacus, venenatis ut porta ac, pretium eget tortor. Nam feugiat, leo in varius tempor, metus velit eleifend erat, eu commodo enim arcu non urna. Praesent nec enim arcu. Maecenas vel blandit dolor, a auctor ligula. Mauris orci lorem, vulputate ac orci ut, fermentum vestibulum orci. Sed nec ante ultricies, aliquet nisi eget, ornare est.</p>
  </div>
)

const Poruka = ({ poruke }) => {
  const id = useParams().id
  const poruka = poruke.find(p => p.id === Number(id))
  return (
    <div>
      <h2>{poruka.sadrzaj}</h2>
      <div>{poruka.korisnik}</div>
      <div><strong>{poruka.vazno ? 'Važno' : ''}</strong></div>
    </div>
  )
}

const Poruke = ({poruke}) => (
  <div>
    <h2>Poruke</h2>
    <ul>
      {poruke.map(p =>
        <li key={p.id}>
          <Link to={`/poruke/${p.id}`}>{p.sadrzaj}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Korisnici = () => (
  <div>
    <h2>Korisnici</h2>
    <ul>
      <li>Brendan Eich</li>
      <li>Tim Berners-Lee</li>
      <li>Håkon Wium Lie</li>
    </ul>
  </div>
)

const Login = (props) => {
  const history = useHistory()

  const prijava = (e) => {
    e.preventDefault()
    props.onLogin('tblee')
    history.push('/')
  }

  return (
    <div>
    <h2>Prijava</h2>
    <form onSubmit={prijava}>
      <div>
        username: <input />
      </div>
      <div>
        password: <input type='password' />
      </div>
      <button type="submit">prijava</button>
    </form>
  </div>
  )
}

const App = () => {
  const [poruke, postaviPoruke] = useState([
    {
      id: 1,
      sadrzaj: 'HTML je jednostavan',
      vazno: true,
      korisnik: 'Tim Berners-Lee'
    },
    {
      id: 2,
      sadrzaj: 'JavaScript je programski jezik preglednika',
      vazno: true,
      korisnik: 'Brendan Eich'
    },
    {
      id: 3,
      sadrzaj: 'Najvažnije metode HTTP protokola su GET i POST',
      vazno: false,
      korisnik: 'Tim Berners-Lee'
    }
  ])
  const [korisnik, postaviKorisnika] = useState(null)

  const login = (korisnik) => {
    postaviKorisnika(korisnik)
  }
  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>pocetna</Link>
        <Link style={padding} to='/poruke'>poruke</Link>
        <Link style={padding} to='/korisnici'>korisnici</Link>
        {korisnik
        ? <em>Prijavljen kao: {korisnik}</em>
        : <Link style={padding} to='/login'>prijava</Link>
        }
      </div>

      <Switch>
        <Route path='/poruke/:id'>
          <Poruka poruke={poruke} />
        </Route>
        <Route path='/poruke'>
          <Poruke poruke={poruke} />
        </Route>
        <Route path='/korisnici'>
          {korisnik ? <Korisnici /> : <Redirect to='/login' />}
        </Route>
        <Route path='/login'>
          <Login onLogin={login} />
        </Route>
        <Route path='/'>
          <Pocetna />
        </Route>
      </Switch>
    </Router>
  )
}

export default App