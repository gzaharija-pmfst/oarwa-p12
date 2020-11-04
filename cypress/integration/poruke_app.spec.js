describe('Poruke aplikacija', () => {
  it('naslovna stranica se otvara', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Poruke - Novo')
    cy.contains('Alati i okviri za razvoj web aplikacija!')
  })
})