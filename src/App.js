import React, { useState } from 'react'

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
  const [stranica, postaviStranicu] = useState('pocetna')

  const naStranicu = (stranica) => (event) => {
    event.preventDefault()
    postaviStranicu(stranica)
  }

  const sadrzaj = () => {
    if (stranica === 'pocetna') {
      return <Pocetna />
    } else if (stranica === 'poruke') {
      return <Poruke />
    } else if (stranica === 'korisnici') {
      return <Korisnici />
    }
  }

  const padding = {
    padding: 5
  }

  return (
    <div style={padding} >
      <div>
        <a href="" onClick={naStranicu('pocetna')} style={padding} >
          pocetna
        </a>
        <a href="" onClick={naStranicu('poruke')} style={padding}>
          poruke
        </a>
        <a href="" onClick={naStranicu('korisnici')} style={padding}>
          korisnici
        </a>
      </div>

      {sadrzaj()}
    </div>
  )
}

export default App