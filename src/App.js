import React, { useState, useEffect } from 'react'
import Poruka from './components/Poruka'
import Footer from './components/Footer'
import porukeServer from './services/poruke'
import prijavaMetode from './services/login'



const App = (props) => {
  const [poruke, postaviPoruke] = useState([])
  const [unosPoruke, postaviUnos] = useState("...unesi poruku")
  const [ispisiSve, postaviIspis] = useState(true)
  const [username, postaviUsername] = useState('')
  const [pass, postaviPass] = useState('')
  const [korisnik, postaviKorisnika] = useState(null)

  useEffect(() => {
    console.log("Effect hook");
    porukeServer
      .dohvatiSve()
      .then(pocPoruke => {
        console.log("Podaci su učitani");
        postaviPoruke(pocPoruke)
      })
  }, [])

  useEffect( () => {
    const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON)
      postaviKorisnika(korisnik)
      porukeServer.postaviToken(korisnik.token)
    }
  }, [])

  console.log("Renderirano je", poruke.length, "objekata")

  const porukeZaIspis = ispisiSve ? poruke : poruke.filter(p => p.vazno === true)

  const novaPoruka = (e) => {
    e.preventDefault()
    console.log("Klik", e.target);
    const noviObjekt = {
      sadrzaj: unosPoruke,
      datum: new Date().toISOString(),
      vazno: Math.random() > 0.5
    }
    porukeServer
      .stvori(noviObjekt)
      .then((response) => {
        console.log(response)
        postaviPoruke(poruke.concat(response))
        postaviUnos('')
      })

  }
  const promjenaUnosa = (e) => {
    console.log(e.target.value);
    postaviUnos(e.target.value)
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
    <form onSubmit={novaPoruka}>
      <input value={unosPoruke} onChange={promjenaUnosa} />
      <button type="submit">Spremi</button>
    </form>
  )

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