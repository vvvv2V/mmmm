// cypress/support/commands.js

Cypress.Commands.add('login', (email, password) => {
  // Simples mock de login via API - adaptar conforme backend
  cy.request('POST', 'http://localhost:3001/api/auth/login', { email, password })
    .then((resp) => {
      window.localStorage.setItem('token', resp.body.token)
    })
})

Cypress.Commands.add('fillStripeForm', () => {
  // placeholder - adapt to payments implementation
  cy.get('input[name="cardnumber"]').type('4242424242424242')
  cy.get('input[name="exp-date"]').type('12/34')
  cy.get('input[name="cvc"]').type('123')
})
