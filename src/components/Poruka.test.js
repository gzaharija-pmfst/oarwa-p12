import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import {prettyDOM} from '@testing-library/dom'
import Poruka from './Poruka'

test('renderira sadrzaj', () => {
  const poruka = {
    sadrzaj: 'Testiranje komponenti',
    vazno: true
  }

  const komponenta = render(
    <Poruka poruka={poruka} />
  )
  const li = komponenta.container.querySelector('li')
  //console.log(prettyDOM(li));

  //komponenta.debug()

  expect(komponenta.container).toHaveTextContent('Testiranje komponenti')

  // Drugi način
  const element = komponenta.getByText('Testiranje komponenti')
  expect(element).toBeDefined()

  // Treci nacin
  const div = komponenta.container.querySelector('.poruka')
  expect(div).toHaveTextContent('Testiranje komponenti')
})

test('klik poziva event handler', () => {
  const poruka = {
    sadrzaj: 'Testiranje komponenti',
    vazno: true
  }

  const testHandler = jest.fn()

  const komponenta = render(
  <Poruka poruka={poruka} promjenaVaznosti={testHandler} />
  )
  const button = komponenta.getByText('Označi kao nevažno')
  fireEvent.click(button)

  expect(testHandler.mock.calls).toHaveLength(1)

})