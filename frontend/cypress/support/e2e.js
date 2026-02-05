// cypress/support/e2e.js
// Import commands and global config for Cypress
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
