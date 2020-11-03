import React, { useState, useEffect, useRef } from 'react'
import Poruka from './components/Poruka'
import Footer from './components/Footer'
import LoginForma from './components/LoginForma'
import porukeServer from './services/poruke'
import prijavaMetode from './services/login'
import Promjenjiv from './components/Promjenjiv'
import PorukaForma from './components/PorukaForma'


const App = (props) => {
  const [poruke, postaviPoruke] = useState([])
  const [ispisiSve, postaviIspis] = useState(true)
  const [username, postaviUsername] = useState('')
  const [pass, postaviPass] = useState('')
  const [korisnik, postaviKorisnika] = useState(null)

  const porukaFormaRef = useRef()

  useEffect(() => {
    console.log("Effect hook");
    porukeServer
      .dohvatiSve()
      .then(pocPoruke => {
        console.log("Podaci su učitani");
        postaviPoruke(pocPoruke)
      })
  }, [])

  useEffect(() => {
    const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON)
      postaviKorisnika(korisnik)
      porukeServer.postaviToken(korisnik.token)
    }
  }, [])

  console.log("Renderirano je", poruke.length, "objekata")

  const porukeZaIspis = ispisiSve ? poruke : poruke.filter(p => p.vazno === true)

  const novaPoruka = (noviObjekt) => { 
    porukaFormaRef.current.promjenaVidljivosti()
    porukeServer
      .stvori(noviObjekt)
      .then((response) => {
        console.log(response)
        postaviPoruke(poruke.concat(response))
      })
  }

  const promjenaVaznostiPoruke = (id) => {
    const poruka = poruke.find(p => p.id === id)
    const novaPoruka = {
      ...poruka,
      vazno: !poruka.vazno
    }
    porukeServer
      .osvjezi(id, novaPoruka)
      .then((response) => {
        console.log(response);
        postaviPoruke(poruke.map(p => p.id !== id ? p : response.data))
      })
  }
  const brisiPoruku = (id) => {
    porukeServer
      .brisi(id)
      .then(response => {
        console.log(response);
        postaviPoruke(poruke.filter(p => p.id !== id))
      })
  }
  const userLogin = async (e) => {
    e.preventDefault()
    try {
      const korisnik = await prijavaMetode.prijava({
        username, pass
      })
      window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(korisnik))
      porukeServer.postaviToken(korisnik.token)
      postaviKorisnika(korisnik)
      postaviUsername('')
      postaviPass('')
    } catch (exception) {
      console.log(exception);
      alert('Neispravni podaci')
    }
  }


  const porukaForma = () => (
    <Promjenjiv natpis='Nova poruka' ref={porukaFormaRef}>
      <PorukaForma
        spremiPoruku={novaPoruka}
      />
    </Promjenjiv>
  )

  const loginForma = () => {
    return (
      <Promjenjiv natpis='Prijavi se'>
        <LoginForma
          username={username}
          pass={pass}
          promjenaImena={({ target }) => postaviUsername(target.value)}
          promjenaLozinke={({ target }) => postaviPass(target.value)}
          userLogin={userLogin}
        />
      </Promjenjiv>
    )
  }

  return (
    <div>
      <h1>Poruke - Novo</h1>
      {korisnik === null
        ? loginForma()
        : <div>
          <p>Prijavljeni ste kao: {korisnik.ime}</p>
          {porukaForma()}
        </div>
      }
      <div>
        <button onClick={() => postaviIspis(!ispisiSve)}>
          Prikaži {ispisiSve ? "samo važne" : "sve"}
        </button>
      </div>
      <ul>
        {porukeZaIspis.map(p =>
          <Poruka
            key={p.id}
            poruka={p}
            brisiPoruku={() => brisiPoruku(p.id)}
            promjenaVaznosti={() => promjenaVaznostiPoruke(p.id)} />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App