describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('carrega header e main', () => {
    cy.get('header').should('be.visible')
    cy.get('main').should('be.visible')
  })

  it('newsletter signup funciona (fluxo simulado)', () => {
    cy.get('[data-cy=newsletter-email]').type('test@example.com')
    cy.get('[data-cy=newsletter-submit]').click()
    cy.get('[data-cy=newsletter-success]', { timeout: 5000 }).should('be.visible')
  })
})
