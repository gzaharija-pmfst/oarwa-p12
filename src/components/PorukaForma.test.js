import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PorukaForma from './PorukaForma'

test('<PorukaForma> poziva onSubmit i mijenja stanje roditelja', () =>{
  const stvoriPoruku = jest.fn()

  const komponenta = render(
    <PorukaForma spremiPoruku={stvoriPoruku} />
  )

  const input = komponenta.container.querySelector('input')
  const forma = komponenta.container.querySelector('form')

  fireEvent.change(input, {
    target: {value: 'testiranje forme nije bas jednostavno'}
  })
  fireEvent.submit(forma)

  expect(stvoriPoruku.mock.calls).toHaveLength(1)  
  expect(stvoriPoruku.mock.calls[0][0].sadrzaj).toBe('testiranje forme nije bas jednostavno')
})