describe('Pagamento', () => {
  it('inicia fluxo de pagamento PIX', () => {
    cy.visit('/checkout')
    cy.get('[data-cy=pix-option]').click()
    cy.get('[data-cy=pix-qrcode]', { timeout: 5000 }).should('be.visible')
  })

  it('inicia fluxo de pagamento cartão (simulado)', () => {
    cy.visit('/checkout')
    cy.get('[data-cy=card-option]').click()
    cy.fillStripeForm()
    cy.get('[data-cy=pay-button]').click()
    cy.url().should('include', '/sucesso')
  })
})
