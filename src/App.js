import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useParams, useHistory } from 'react-router-dom'
import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap'

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

const Poruke = ({ poruke }) => (
  <div>
    <h2>Poruke</h2>
    <Table striped>
      <tbody>
        {poruke.map(p =>
          <tr key={p.id}>
            <td>
              <Link to={`/poruke/${p.id}`}>{p.sadrzaj}</Link>
            </td>
            <td>
              {p.korisnik}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
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
      <Form onSubmit={prijava}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" />
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" />
          <Button variant="primary" type="submit">
            Prijava
          </Button>
        </Form.Group>
      </Form>
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
  const [info, postaviInfo] = useState(null)

  const login = (korisnik) => {
    postaviKorisnika(korisnik)
    postaviInfo(`Dobrodošao ${korisnik}`)
    setTimeout(() => {
      postaviInfo(null)
    }, 5000)
  }
  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      {(info &&
        <Alert variant="success">
          {info}
        </Alert>
      )}
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">pocetna</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/poruke">poruke</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/korisnici">korisnici</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {korisnik
                  ? <em>Prijavljen kao: {korisnik}</em>
                  : <Link style={padding} to='/login'>prijava</Link>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

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
    </div>
  )
}

export default App