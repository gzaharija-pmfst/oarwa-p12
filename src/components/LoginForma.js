import React from 'react'
import PropTypes from 'prop-types'
const LoginForma = ({
  userLogin,
  promjenaImena,
  promjenaLozinke,
  username,
  pass
}) => (
  <form onSubmit={userLogin}>
    <div>
      Korisničko ime:
    <input type='text' value={username} name='Username'
        onChange={promjenaImena} />
    </div>
    <div>
      Lozinka:
  <input type='password' value={pass} name='Pass'
        onChange={promjenaLozinke} />
    </div>
    <button type='submit'>Prijava</button>
  </form>
)
LoginForma.propTypes = {
  userLogin: PropTypes.func.isRequired,
  promjenaImena: PropTypes.func.isRequired,
  promjenaLozinke: PropTypes.func.isRequired,
  username : PropTypes.string.isRequired,
  pass : PropTypes.string.isRequired
}

export default LoginForma