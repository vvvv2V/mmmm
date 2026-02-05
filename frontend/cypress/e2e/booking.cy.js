describe('Agendamento', () => {
  beforeEach(() => {
    // se necessário, fazer login
    cy.visit('/agendar')
  })

  it('preenche form de agendamento básico', () => {
    cy.get('[data-cy=select-service]').first().click()
    cy.get('[data-cy=select-date]').click()
    cy.get('[data-cy=calendar-day]').first().click()
    cy.get('[data-cy=select-time]').select('10:00')
    cy.get('[data-cy=submit-booking]').click()
    cy.url().should('include', '/checkout')
  })
})
