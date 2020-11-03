	
import axios from 'axios'

const osnovniUrl = '/api/poruke'
//const osnovniUrl = 'http://localhost:3001/api/poruke'
 
let token = null

const postaviToken = noviToken => {
    token = `bearer ${noviToken}`
}
const dohvatiSve = () => {   
    const promise = axios.get(osnovniUrl);
    return promise.then( response => response.data)
}
 
const stvori = async noviObjekt => {
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = await axios.post(osnovniUrl, noviObjekt, config)
    return odgovor.data
}
 
const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovniUrl}/${id}`, noviObjekt)
}

const brisi = id => {
    return axios.delete(`${osnovniUrl}/${id}`)
}
 
export default { dohvatiSve, stvori, osvjezi, brisi, postaviToken}
/* export default {
    dohvatiSve: dohvatiSve,
    stvori: stvori,
    osvjezi: osvjezi
} */